/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.NODE_ENV === 'production'
            ? 'https://scholarly-nu.vercel.app'
            : 'http://localhost:3000',
    },
};
export default nextConfig;
