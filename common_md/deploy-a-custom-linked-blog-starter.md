---
title: Deploy a custom version of the linked-blog-starter
---

By the end of this tutorial, you will have a custom version of the [linked-blog-starter](https://github.com/matthewwong525/linked-blog-starter) that deploys to Vercel

## Fork the repository and get it to run locally

First, we want to fork the linked-blog-starter repo, then [install](install-linked-blog-starter-locally.md) and run it locally.

**Note**: Update `https://github.com/matthewwong525/linked-blog-starter` with your own repository link

1. Clone this repo by running `git clone https://github.com/matthewwong525/linked-blog-starter`
1. `cd linked-blog-starter`
1. `npm install`
1. `npm run dev`
1. Go to `localhost:3000` in your browser

After doing the installations, you can update the components as you wish. 

## Make changes to the forked repository

Here are the [docs for Next.JS](https://nextjs.org/docs) and a few things to know about:

* Update `/next.config.js` to update the redirects
* Use `/components/misc/preview-link.tsx` to add link previews to any text on hover
* The [fleeting-notes-website](https://github.com/fleetingnotes/fleeting-notes-website) repository is a fork with lots of good examples (including, post-list, comments, etc.)
* The `/common_md/` directory is where the markdown files are stored in the [common markdown](https://commonmark.org/) format. Use [obsidian-export](https://github.com/zoni/obsidian-export) to convert your notes to common markdown

## Publish the repository and link it with an MD repository

1. [Create and publish](publish-your-obsidian-notes-with-linked-blog-starter.md) your forked md repository
1. Update the ["BLOG_REPO" environment variable](update-publish-settings-github-actions.md) to point to your forked repo
1. OPTIONAL: [Connect your Obsidian Vault with Github](connect-obsidian-vault-with-github.md)
