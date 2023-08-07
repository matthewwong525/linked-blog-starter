module.exports = {
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/posts',
        destination: '/posts/1',
        permanent: true,
      }
    ]
  },
}