# Host your second brain with Next.JS

This repository is a modified version of the [blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) provided by Next.JS. Below are some added features of the [linked-blog-starter](https://github.com/matthewwong525/linked-blog-starter):

* Automatically generated backlinks and link previews
* [Works out of the box](notes/works-out-of-the-box-with-markdown-files.md) with your markdown files
* Supports markdown & Obsidian specific markdown syntax (via [obsidian-export](https://github.com/zoni/obsidian-export))
* Highly customizable with Next.js, Tailwind v3 and React

## How to use this with Obsidian markdown files

To use this with Obsidian, you'll need to use [obsidian-export](https://github.com/zoni/obsidian-export) to [convert your obsidian notes to common markdown](posts/convert-obsidian-notes-to-common-markdown.md) format. Once in the common markdown format, add the markdown files to the `/common_md` folder and the blog posts will be created.

If you are tired of constantly running obsidian-export and manually deploying, see how I [automate this process with GitHub actions](posts/deploy-obsidian-notes-with-linked-blog-starter-and-github-actions.md)

## Demo

[https://linked-blog-starter.vercel.app/](https://linked-blog-starter.vercel.app/)

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) or preview live with [StackBlitz](https://stackblitz.com/github/matthewwong525/linked-blog-starter)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/blog-starter&project-name=blog-starter&repository-name=blog-starter)

### Related examples

* [Fleeting Notes](https://fleetingnotes.app)

## [Installation](notes/install-linked-blog-starter.md)

1. Clone this repo by running `git clone https://github.com/matthewwong525/linked-blog-starter`
1. `cd linked-blog-starter`
1. `npm install`
1. `npm run dev`

# Notes

* `linked-blog-starter` uses [Tailwind CSS](https://tailwindcss.com) [(v3.0)](https://tailwindcss.com/blog/tailwindcss-v3).
* Markdown files are [statically generated](notes/statically-generated.md)
* Markdown is styled using [generated GitHub flavoured markdown](https://github.com/sindresorhus/github-markdown-css)