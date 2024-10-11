/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
  
    DB_URI:
      "mongodb+srv://abc:abc@cluster0.9smxrlg.mongodb.net/LearnNode?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
