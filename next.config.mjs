/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'private-user-images.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'la-proyectos.notion.site',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      { protocol: 'https', hostname: 'private-user-images.githubusercontent.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'camo.githubusercontent.com' }, // ← NUEVO

      { protocol: 'https', hostname: 'la-proyectos.notion.site' },
      { protocol: 'https', hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com' },
      { protocol: 'https', hostname: 'portfolio-lgdev.vercel.app' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'ca.slack-edge.com' },
      
      // Cloudinary (la portada original apunta a Cloudinary)
      { protocol: 'https', hostname: 'res.cloudinary.com' },
            // LinkedIn
      { protocol: 'https', hostname: 'media.licdn.com' },
    ],
  },
};


export default nextConfig