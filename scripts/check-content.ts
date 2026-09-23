import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { articles } from '../src/content/documents';
import { legacyArticles } from '../src/content/legacy';
import { reviewCatalog, legacyReviewRedirects } from '../src/data/reviewCatalog';
import { checkContent, formatQualityReport, qualityExitCode } from '../src/content/quality';

const root = fileURLToPath(new URL('../', import.meta.url));
// Read actual static Route declarations without importing the app or formatting invalid dates.
const source = ts.createSourceFile('App.tsx', fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const paths = [...reviewCatalog.map(item => item.link), ...Object.keys(legacyReviewRedirects)];
function visit(node: ts.Node) {
  if ((ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) && node.tagName.getText(source) === 'Route') {
    for (const attribute of node.attributes.properties) if (ts.isJsxAttribute(attribute) && attribute.name.getText(source) === 'path' && attribute.initializer && ts.isStringLiteral(attribute.initializer)) {
      const value = attribute.initializer.text;
      if (!value.includes('*') && !value.includes(':')) paths.push(value);
    }
  }
  ts.forEachChild(node, visit);
}
visit(source);
const publicRoot = path.resolve(root, 'public');
const report = checkContent(articles, {
  knownPaths: paths, legacySlugs: legacyArticles.map(item => item.slug),
  assetExists: src => {
    const resolved = path.resolve(publicRoot, '.' + src);
    return resolved.startsWith(publicRoot + path.sep) && fs.existsSync(resolved) && fs.statSync(resolved).isFile();
  },
});
console.log(formatQualityReport(report));
console.log(`\nScope: structured articles (including drafts). ${legacyArticles.length} legacy article bodies are not audited. Warning/error totals count findings, not articles.`);
process.exitCode = qualityExitCode(report);

