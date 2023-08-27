/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    ROOT_APP: process.env.ROOT_APP,
    ROOT_API: process.env.ROOT_API,
    ROOT_AUTH: process.env.ROOT_AUTH,
    PROJECT_KEY: process.env.PROJECT_KEY,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.SECRET,
    SCOPE_SPA: process.env.SCOPE_SPA,

    CLIENT_ID_UNKNOWN: process.env.CLIENT_UNKNOWN_ID,
    CLIENT_SECRET_UNKNOWN: process.env.SECRET_UNKNOWN,
    SCOPE_UNKNOWN: process.env.SCOPE_UNKNOWN,

    CLIENT_ID_CO: process.env.CLIENT_ID_CO,
    CLIENT_SECRET_CO: process.env.SECRET_CO,
    SCOPE_CO: process.env.SCOPE_CO,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
