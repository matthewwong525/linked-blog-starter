module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/README',
        permanent: true,
      },
    ]
  },
}