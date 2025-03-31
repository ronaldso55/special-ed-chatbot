import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: false,
  }
};

export default nextConfig;
