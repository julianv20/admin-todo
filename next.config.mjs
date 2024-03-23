/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailus.io'
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },

      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      }
    ]
  }
}

export default nextConfig
