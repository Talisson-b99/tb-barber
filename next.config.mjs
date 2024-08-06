/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'fsw-barber.s3.amazonaws.com',
      },
    ],
  },
}

export default nextConfig
