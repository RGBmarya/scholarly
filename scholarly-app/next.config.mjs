/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['react-pdf-highlighter'],
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config;
    },    
};
export default nextConfig;
