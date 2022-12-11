import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getPostBySlug, getAllPosts, getLinksMapping } from '../lib/api'
import Head from 'next/head'
import { markdownToHtml } from '../lib/markdownToHtml'
import type PostType from '../interfaces/post'
import path from 'path'
import PostSingle from '../components/blog/post-single'
import Layout from '../components/misc/layout'

type Items = {
  title: string,
  excerpt: string,
}

type Props = {
  post: PostType
  slug: string
  backlinks: { [k: string]: Items }
}

export default function Post({ post, backlinks }: Props) {
  const router = useRouter()
  const description = post.excerpt.slice(0, 155)
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <Layout>
          <Head>
            <title>{post.title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={post.title}/>
            <meta name="og:description" content={description} />
            {post.ogImage?.url ? <meta property="og:image" content={post.ogImage.url} /> : <meta property="og:image" content="favicon/512.png" />}
            <meta property="twitter:title" content={post.title} />
            <meta name="twitter:description" content={description} />
            {post.ogImage?.url ? <meta property="twitter:image" content={post.ogImage.url} /> : <meta property="twitter:image" content="favicon/512.png" />}
          </Head>
          <PostSingle
            title={post.title}
            content={post.content}
            date={post.date}
            author={post.author}
            backlinks={backlinks}
          />
        </Layout>
      )}
    </>
  )
}

type Params = {
  params: {
    slug: string[]
    backlinks: string[]
  }
}

export async function getStaticProps({ params }: Params) {
  const slug = path.join(...params.slug)
  const post = await getPostBySlug(slug, [
    'title',
    'excerpt',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '', slug)
  const linkMapping = await getLinksMapping()
  const backlinks = Object.keys(linkMapping).filter(k => linkMapping[k].includes(post.slug) && k !== post.slug)
  const backlinkNodes = Object.fromEntries(await Promise.all(backlinks.map(async (slug) => {
    const post = await getPostBySlug(slug, ['title', 'excerpt']);
    return [slug, post]
  })));

  return {
    props: {
      post: {
        ...post,
        content,
      },
      backlinks: backlinkNodes,
    },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts(['slug'])
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug.split(path.sep),
        },
      } 
    }),
    fallback: false,
  }
}
