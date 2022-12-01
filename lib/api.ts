import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getFilesRecursively } from './modules/find-files-recusively.mjs'

const mdDir = path.join(process.cwd(), '_commonMD')

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = path.join(mdDir, `${realSlug}.md`)
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
  let files = getFilesRecursively(mdDir, /\.md/);
  const posts = files
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export function getLinksMapping() {
  const linksMapping = new Map<string, string[]>();
  const postsMapping = new Map(getAllPosts(['slug', 'content']).map(i => [i.slug, i.content]));
  const allSlugs = new Set(postsMapping.keys());
  postsMapping.forEach((content, slug) => {
    const mdLink = /\[[^\[\]]+\]\(([^\(\)]+)\)/g
    const matches = Array.from(content.matchAll(mdLink))
    const linkSlugs = []
    for (var m of matches) {
      const linkSlug = getSlugFromHref(slug, m[1])
      if (allSlugs.has(linkSlug)) {
        linkSlugs.push(linkSlug);
      }
    }
    linksMapping[slug] = linkSlugs
  });
  return linksMapping;
}

export function getSlugFromHref (currSlug: string, href: string) {
  return decodeURI(path.join(...currSlug.split(path.sep).slice(0, -1), href)).replace(/\.md$/, '')
}

export function updateMarkdownLinks(markdown: string, currSlug: string) {
  // remove `.md` from links
  markdown = markdown.replaceAll(/(\[[^\[\]]+\]\([^\(\)]+)(\.md)(\))/g, "$1$3");

  // update image links
  markdown = markdown.replaceAll(/(\[[^\[\]]*\]\()([^\(\)]+)(\))/g, (m, m1, m2, m3) => {
    const relLink = m2
    const slugDir = path.join(...currSlug.split(path.sep).slice(0, -1))
    const fileSlug = path.join(mdDir, path.dirname(slugDir), relLink)
    if (fs.existsSync(fileSlug)) {
      const imgPath = path.join('./md_assets', relLink)
      return `${m1}${imgPath}${m3}`
    }
    return m;
  });
  return markdown
}
