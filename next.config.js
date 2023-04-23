/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental:{appDir: false},
  swcMinify: true,
  images:{
    domains:['image.tmdb.org','sm.ign.com']
  }
}

module.exports = nextConfig