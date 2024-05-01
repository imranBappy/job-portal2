import nextPWA from "@ducanh2912/next-pwa";
const withPWA = nextPWA({
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    dest: "public",
    // fallbacks: {
    //     document: "/offline",
    // },
    workboxOptions: {
        disableDevLogs: true,
    },
});

/** @type {import('next').NextConfig} */
// import webpack from 'webpack';
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.plugins.push(
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
            }),
        );
        return config;
    },
    images: {
        domains: [
            'tenor.com',
            'www.w3kernel.com',
            'w3storage.s3-ap-south-1.amazonaws.com',
            "w3storage.s3.ap-south-1.amazonaws.com",
            "w3storage.s3.amazonaws.com",
        ],
    },
    // fastRefresh: true,
    // productionBrowserSourceMaps: false, // Disable source maps in development
    // optimizeFonts: false, // Disable font optimization
    // minify: false // Disable minification
};
export default withPWA(nextConfig);
