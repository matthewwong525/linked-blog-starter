// https://www.codeconcisely.com/posts/nextjs-storing-images-next-to-markdown/
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import fsExtra from 'fs-extra';
import { getFilesRecursively } from './find-files-recusively.mjs';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const allowedImageFileExtensions = /^((?!\.md).)*$/; // not markdown
const targetDir = process.env.MD_ASSET_DIR
const postsDir = process.env.COMMON_MD_DIR;

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