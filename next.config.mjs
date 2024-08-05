/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = {
    images: {
       domains: ['utfs.io'],
    },
};

export default withPWA({
    dest: 'public'
})(nextConfig);
