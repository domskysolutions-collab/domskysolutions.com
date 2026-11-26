// Uses an existing sharp installation: node render.cjs <sharp-package-path>.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require(process.argv[2]);
const root = __dirname;
const names = ['ai-agent-vs-automation-client-intake-2027-cover-v1','client-intake-approval-boundary-v1','client-intake-approval-boundary-mobile-v1'];
(async () => {
  for (const name of names) {
    const input=path.join(root,name+'.svg');
    await sharp(input).png().toFile(path.join(root,'previews',name+'.png'));
    await sharp(input).resize({width:name.includes('mobile')?270:320}).png().toFile(path.join(root,'previews',name+'-thumbnail.png'));
  }
  const cover=names[0]+'.webp';
  await sharp(path.join(root,names[0]+'.svg')).webp({quality:88,effort:6}).toFile(path.join(root,cover));
  fs.copyFileSync(path.join(root,cover),path.resolve(root,'../../../../public/images/comparisons',cover));
  console.log('Rendered full-size and thumbnail previews; encoded and staged cover WebP.');
})();
