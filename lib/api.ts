import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), '_posts')

const getFilesRecursively = (directory: string) => {
  let files = [];
  const recusiveFindFiles = (dir: string) => {
    const filesInDirectory = fs.readdirSync(dir);
    for (const file of filesInDirectory) {
      const absolute = path.join(dir, file);
      if (fs.statSync(absolute).isDirectory()) {
          recusiveFindFiles(absolute);
      } else {
          files.push(path.relative(directory, absolute));
      }
    }
  };
  recusiveFindFiles(directory);
  return files;
}


export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  let files = getFilesRecursively(postsDirectory);
  const posts = files
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
  return []
}
