import path from 'path';
import { Config } from 'tailwindcss';

const nextConfig = {
  webpack(config: Config) {
    config.resolve.alias['@'] = path.join(__dirname, '/');
    return config;
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

export default nextConfig;