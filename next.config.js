/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'example.com',
      'ayssewtqageiqpbhiqak.supabase.co',
      'www.auburnadvertising.com',
      'www.tamoco.com',
      'cdn.prod.website-files.com',
      'i0.wp.com',
      'africanmarketingconfederation.org',
      'res.cloudinary.com'
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment'
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  }
};

module.exports = nextConfig;