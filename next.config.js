/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    ROOT_API: process.env.NEXT_PUBLIC_ROOT_API,
    ROOT_AUTH: process.env.NEXT_PUBLIC_ROOT_AUTH,
    PROJECT_KEY: process.env.NEXT_PUBLIC_PROJECT_KEY,
    CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
    CLIENT_SECRET: process.env.NEXT_PUBLIC_SECRET,
    SCOPE_SPA: process.env.NEXT_PUBLIC_SCOPE_SPA,

    CLIENT_ID_UNKNOWN: process.env.NEXT_PUBLIC_CLIENT_UNKNOWN_ID,
    CLIENT_SECRET_UNKNOWN: process.env.NEXT_PUBLIC_SECRET_UNKNOWN,
    SCOPE_UNKNOWN: process.env.SCOPE_UNKNOWN,

    CLIENT_ID_CO: process.env.NEXT_PUBLIC_CLIENT_ID_CO,
    CLIENT_SECRET_CO: process.env.NEXT_PUBLIC_SECRET_CO,
    SCOPE_CO: process.env.NEXT_PUBLIC_SCOPE_CO,
  },
};

module.exports = nextConfig;
