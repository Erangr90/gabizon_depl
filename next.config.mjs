/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['knex'],
  images: {
    domains: ['res.cloudinary.com', 'img.youtube.com'], // Add Cloudinary's domain
  },
}

export default nextConfig
