import Head from 'next/head'

const Meta = () => {
  const titleText = `${process.env.NEXT_PUBLIC_TITLE} | ${process.env.NEXT_PUBLIC_TAGLINE}`
  return (
    <Head>
      {/* Meta tags */}
      <title>{titleText}</title>
      <meta name="description" content={process.env.NEXT_PUBLIC_DESCRIPTION} />
      <meta property="og:title" content={process.env.NEXT_PUBLIC_TITLE}/>
      <meta name="og:description" content={process.env.NEXT_PUBLIC_DESCRIPTION} />
      <meta property="og:site_name" content={process.env.NEXT_PUBLIC_TITLE}/>
      <meta name="twitter:card" content="summary" />
      <meta property="twitter:title" content={process.env.NEXT_PUBLIC_TAGLINE} />
      <meta name="twitter:description" content={process.env.NEXT_PUBLIC_DESCRIPTION} />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
    </Head>
  )
}

export default Meta
