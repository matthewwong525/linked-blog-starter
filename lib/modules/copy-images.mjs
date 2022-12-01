// https://www.codeconcisely.com/posts/nextjs-storing-images-next-to-markdown/
import fs from 'fs';
import path from 'path';
import fsExtra from 'fs-extra';
import { getFilesRecursively } from './find-files-recusively.mjs';

const allowedImageFileExtensions = /^((?!\.md).)*$/; // not markdown
const relTargetDir = 'md_assets'
const targetDir = path.join('./public', relTargetDir);
const postsDir = './_commonMD';

function createPostImageFoldersForCopy() {
  const imgSlugs = getFilesRecursively(postsDir, allowedImageFileExtensions);
  for (const relSlug of imgSlugs) {
    const currSlug = path.join(postsDir, relSlug)
    const targetSlug = path.join(targetDir, relSlug)
    const slugDir = path.dirname(targetSlug)
    if (!fs.existsSync(slugDir)) {
      fs.mkdirSync(slugDir, { recursive: true})
    }
    fs.copyFileSync(currSlug, targetSlug)
  }
}


await fsExtra.emptyDir(targetDir);
createPostImageFoldersForCopy();