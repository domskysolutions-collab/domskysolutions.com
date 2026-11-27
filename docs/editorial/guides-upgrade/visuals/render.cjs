// node render.cjs <already available sharp package path>; no install/network.
const fs=require('node:fs');
const path=require('node:path');
const sharp=require(process.argv[2]);
const stem='solo-business-ai-tools-v2';
(async()=>{
  const input=path.join(__dirname,stem+'.svg');
  fs.mkdirSync(path.join(__dirname,'previews'),{recursive:true});
  await sharp(input).png().toFile(path.join(__dirname,'previews',stem+'.png'));
  await sharp(input).resize({width:320}).png().toFile(path.join(__dirname,'previews',stem+'-320.png'));
  await sharp(input).webp({quality:88,effort:6}).toFile(path.join(__dirname,stem+'.webp'));
  fs.copyFileSync(path.join(__dirname,stem+'.webp'),path.resolve(__dirname,'../../../../public/images/blog',stem+'.webp'));
  console.log('Rendered full/320px previews and staged 1600×900 WebP.');
})();
