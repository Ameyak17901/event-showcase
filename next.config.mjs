/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gvtpfkveaageflzqlbyl.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**", // Adjust the pathname if needed
      },
    ],
  },
};

export default nextConfig;
