#!/usr/bin/env python3
"""Behavioral checks for the reusable draft generator and validator."""
import copy
import importlib.util
import json
import tempfile
import unittest
import re
import subprocess
import sys
from pathlib import Path

sys.dont_write_bytecode = True

HOME = Path(__file__).resolve().parents[1]


def module(name, file):
    spec = importlib.util.spec_from_file_location(name, file)
    value = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(value)
    return value


generate = module('generate_visual', HOME/'scripts/generate-visual.py')
check = module('validate_visual', HOME/'scripts/validate-visual.py')


class VisualBehavior(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.repo = Path.cwd().resolve()

    def brief(self, name='comparison'):
        return json.loads((HOME/'examples'/f'{name}.json').read_text(encoding='utf-8'))

    def test_article_intent_selects_different_archetypes(self):
        self.assertEqual([generate.choose(self.brief(n)) for n in ('comparison', 'workflow', 'editorial')], list(generate.ARCHETYPES))
        broad = self.brief('editorial')
        broad['products'] = ['Claude', 'ChatGPT']
        self.assertEqual(generate.choose(broad), 'geometric-editorial')

    def test_entrypoint_frontmatter_and_reference_targets(self):
        content = (HOME/'SKILL.md').read_text(encoding='utf-8')
        match = re.match(r'^---\n(.*?)\n---\n', content, re.S)
        self.assertIsNotNone(match)
        fields = dict(line.split(': ', 1) for line in match[1].splitlines())
        self.assertEqual(set(fields), {'name', 'description'})
        self.assertRegex(fields['name'], r'^[a-z0-9]+(?:-[a-z0-9]+)*$')
        self.assertLessEqual(len(fields['name']), 64)
        self.assertTrue(0 < len(fields['description']) <= 1024)
        self.assertLess(len(content.splitlines()), 500)
        for target in re.findall(r'\]\(([^)#]+)(?:#[^)]*)?\)', content):
            self.assertTrue((HOME/target).is_file(), target)

    def test_cli_refuses_public_output_and_overwrites(self):
        command = [sys.executable, str(HOME/'scripts/generate-visual.py'), '--repo', str(self.repo), '--brief', str(HOME/'examples/comparison.json')]
        refused = subprocess.run(command+['--out', str(self.repo/'public/skill-test-never-created')], capture_output=True, text=True)
        self.assertNotEqual(refused.returncode, 0)
        self.assertFalse((self.repo/'public/skill-test-never-created').exists())
        staging = self.repo/'output/domsky-editorial-visuals'
        staging.mkdir(parents=True, exist_ok=True)
        with tempfile.TemporaryDirectory(prefix='behavior-', dir=staging) as folder:
            self.assertTrue(Path(folder).resolve().is_relative_to(staging.resolve()))
            first = subprocess.run(command+['--out', folder], capture_output=True, text=True)
            self.assertEqual(first.returncode, 0, first.stderr)
            file = Path(folder)/'claude-chatgpt-gemini-cover.svg'
            before = file.read_bytes()
            retry = subprocess.run(command+['--out', folder], capture_output=True, text=True)
            self.assertNotEqual(retry.returncode, 0)
            self.assertEqual(file.read_bytes(), before)

    def test_each_archetype_and_requested_size_is_real_valid_svg(self):
        with tempfile.TemporaryDirectory() as folder:
            for name in ('comparison', 'workflow', 'editorial'):
                brief = self.brief(name)
                for size_name, (width, height) in generate.SIZES.items():
                    svg, kind = generate.artwork(brief, self.repo, width, height)
                    image = Path(folder)/f'{name}-{size_name}.svg'
                    image.write_text(svg, encoding='utf-8')
                    self.assertEqual(check.dimensions(image), (width, height))
                    self.assertEqual(kind, generate.choose(brief))

    def test_text_is_escaped_not_executable(self):
        brief = self.brief('comparison')
        brief['products'][0] = '<script>alert(1)</script>'
        svg, _ = generate.artwork(brief, self.repo, 1600, 900)
        self.assertIn('&lt;script&gt;', svg)
        self.assertNotIn('<script>', svg)

    def test_source_slug_and_workflow_order_are_explicit(self):
        for key, value in [('articleSlug', '/comparisons/does-not-exist'), ('sourceFiles', ['../outside.ts'])]:
            brief = self.brief()
            brief[key] = value
            with self.assertRaises(ValueError):
                generate.validate_brief(brief, self.repo)
        brief = self.brief('workflow')
        del brief['flow']
        with self.assertRaises(ValueError):
            generate.validate_brief(brief, self.repo)

    def test_geometric_counts_and_meaning_are_explicit(self):
        for key, value in [('selectedModules', 0), ('extraModules', True), ('moduleMeaning', '')]:
            brief = self.brief('editorial')
            brief[key] = value
            with self.assertRaises(ValueError):
                generate.validate_brief(brief, self.repo)

    def test_validator_rejects_missing_alt_wrong_dimensions_and_draft_release(self):
        brief = self.brief()
        svg, kind = generate.artwork(brief, self.repo, 1600, 900)
        with tempfile.TemporaryDirectory() as folder:
            image = Path(folder)/'cover.svg'
            image.write_text(svg, encoding='utf-8')
            data = dict(id='cover', file='cover.svg', alt=brief['alt'], articleSlug=brief['articleSlug'], articleStatus='published', width=1600, height=900, format='article', sourceBrief='comparison.json', method='programmatic', status='draft', archetype=kind)
            manifest = Path(folder)/'cover.visual.json'
            for field, value in [('alt', ''), ('width', 1200), ('file', '../outside.svg')]:
                broken = copy.deepcopy(data)
                broken[field] = value
                manifest.write_text(json.dumps(broken), encoding='utf-8')
                with self.assertRaises(ValueError):
                    check.validate(manifest)
            manifest.write_text(json.dumps(data), encoding='utf-8')
            self.assertEqual(check.validate(manifest)['status'], 'draft')
            with self.assertRaises(ValueError):
                check.validate(manifest, require_approved=True)

    def test_validator_rejects_active_svg_and_malformed_xml(self):
        brief = self.brief()
        svg, _ = generate.artwork(brief, self.repo, 1600, 900)
        with tempfile.TemporaryDirectory() as folder:
            file = Path(folder)/'bad.svg'
            for fragment in ('<script>alert(1)</script>', '<image href="https://example.com/a.png"/>', '<linearGradient id="g"/>', '<rect onclick="alert(1)"/>', '<broken>'):
                file.write_text(svg.replace('</svg>', fragment+'</svg>'), encoding='utf-8')
                with self.assertRaises((ValueError, check.ET.ParseError)):
                    check.dimensions(file)


if __name__ == '__main__':
    unittest.main()
