import {unified} from 'unified'
import {remark} from 'remark'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeRewrite from 'rehype-rewrite';
import rehypeStringify from 'rehype-stringify'
import { getPostBySlug } from './api'
import strip from 'strip-markdown'
import {fromHtml} from 'hast-util-from-html'
import path from 'path'
import {Element, selectAll} from 'hast-util-select'
import { Root } from 'hast-util-from-html/lib'


export default async function markdownToHtml(markdown: string, rootSlug: string[]) {
  // remove `.md` from links
  markdown = markdown.replaceAll(/(\[[^\[\]]+\]\([^\(\)]+)(\.md)(\))/g, "$1$3");
  
  // get common MD hast
  const hastObj = await commonMDToHast(markdown);
  const slugMapping = await getSlugMapping(hastObj, rootSlug);

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeRewrite, {
      selector: 'a',
      rewrite: async (node) => rewriteLinkNodes(node, slugMapping)
    })
    .use(rehypeStringify)
    .process(markdown)
  let htmlStr = file.toString()
  return htmlStr;
}

async function commonMDToHast(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown)
  let hastObj = fromHtml(file.toString())
  return hastObj;
}

async function getMDExcerpt(markdown: string) {
  const file = await remark()
    .use(strip)
    .process(markdown)
  return file.toString().slice(0, 300);
}

async function getSlugMapping(hastNode: Root, rootSlug: string[]) {
  const allAnchors = selectAll('a', hastNode);
  const slugMapping = new Map<string, Element>();
  for (const anchors of allAnchors) {
    const href = anchors.properties.href.toString();
    const hrefSlug = decodeURI(href).split(path.sep);
    const linkSlug = [...rootSlug.slice(0, -1), ...hrefSlug];
    try {
      const items = getPostBySlug(linkSlug, ['title', 'content', 'date']);
      if (items) {
        slugMapping[href] = await createNoteNode(items.title, items.content)
      }
    } catch (e) {
      console.log(e)
    }
  }
  return slugMapping
}

async function createNoteNode(title, content) {
  const mdContentStr = await getMDExcerpt(content);
  return {
    type: 'element',
    tagName: 'span',
    properties: { className: 'note-preview'},
    children: [
      {
        type: 'element',
        tagName: 'span',
        properties: { className: 'note-preview-title' },
        children: [
          {type: 'text', value: title}
        ],
      },
      {
        type: 'element',
        tagName: 'span',
        properties: { className: 'note-preview-content' },
        children: [
          {type: 'text', value: mdContentStr}
        ],
      },
    ]
  }
}

function rewriteLinkNodes (node, slugMapping: Map<string, any>) {
  if (node.type === 'element' && node.tagName === 'a') {
    const noteCardNode = slugMapping[node.properties.href]
    if (noteCardNode) {
      const anchorNode = {...node}
      anchorNode.properties.className = 'internal-link'
      node.tagName = 'span'
      node.properties = { className: 'internal-link-container' }
      node.children = [
        anchorNode,
        noteCardNode
      ]
    }
  }
}
