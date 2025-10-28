/** @type {import('next').NextConfig} */
const nextConfig = {
    // This option is crucial for Docker deployment.
    // It creates a minimal `standalone` folder in your `.next` directory
    // containing only the necessary files to run the application in production.
    // Your Dockerfile is specifically designed to copy from this folder.
    output: 'standalone',
}

module.exports = nextConfig