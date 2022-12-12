---
title: A Customizable Obsidian Publish alternative using Next.JS
---

# A Customizable Obsidian Publish alternative using Next.JS

This repository is a modified version of the blog starter provided by Next.JS. Below are some added features of the [linked-blog-starter](https://github.com/matthewwong525/linked-blog-starter):

* Automatically generated backlinks and link previews
* [Works out of the box](works-out-of-the-box-with-markdown-files.md) with your markdown files (No configuration needed)
* Supports markdown & Obsidian specific markdown syntax (via [obsidian-export](https://github.com/zoni/obsidian-export))
* Embed "PreviewLinks" outside of the markdown files (See the footer in the [example](https://linked-blog-starter.vercel.app/home))
* Highly customizable with Next.js, Tailwind v3 and React

## Why I created this?

It's true that there are many Obsidian Publish alternatives, but, many of these solutions are hard to [customize](deploy-a-custom-linked-blog-starter.md), difficult to publish, and tend to [reinvent the wheel](linked-blog-starter-does-not-reinvent-wheel.md). With this repository, I want to create a simple template that takes care of everything. Here's what the publish workflow looks like after [setting everything up:](publish-your-obsidian-notes-with-linked-blog-starter.md)

1. Write a note in `/publish` folder within Obsidian
1. Run the backup command [using the Obsidian Git plugin](connect-obsidian-vault-with-github.md)
1. Done. Your notes are published. 

## Demo

[https://linked-blog-starter.vercel.app/](https://linked-blog-starter.vercel.app/)

## Deploy your own

Only deploy through this method, if you want to get a quick server up and running. Otherwise, I'd recommend following the [instructions to integrate this with your Obsidian Vault](publish-your-obsidian-notes-with-linked-blog-starter.md).

Deploy the example using [Vercel](https://vercel.com/new/git/external?repository-url=https://github.com/matthewwong525/linked-blog-starter&project-name=linked-blog-starter&repository-name=linked-blog-starter) or preview live with [StackBlitz](https://stackblitz.com/github/matthewwong525/linked-blog-starter)

## Create a Custom Fork

Here is an example of how I [forked this repo](https://github.com/fleetingnotes/fleeting-notes-website) to create a landing page for [Fleeting Notes](https://www.fleetingnotes.app/). See how you can do something similar [here](deploy-a-custom-linked-blog-starter.md).

![fn-website-demo.gif](attachments/fn-website-demo.gif)
