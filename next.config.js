/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: "https://bcmunka01.vercel.app",
    //API_URL:"http://localhost:3000",
    //DB_URI: "mongodb://localhost:27017/olahbakalar2",
    DB_URI: "mongodb+srv://olahtest2:olahtest2@olahtest2.faa64qq.mongodb.net/?retryWrites=true&w=majority",
    NEXTAUTH_URL: "https://bcmunka01.vercel.app", // api url egyformanak kell lennie maskepp nincs authorize (vercel deploy)

    CLOUD_NAME: "dgsvedoif",
    CLOUDINARY_API_KEY: "224415584716488",
    CLOUDINARY_API_SECRET: "KD7hi0a562vxas_gTBpUujw3D6E",

    STRIPE_PUBLIC_KEY:
      "pk_test_51P7xrs2NTym58lhPhethCiPlhm4005maY6vczstYQzLeb5V1s58B11Ve5G1KHEBT4yuJ6pB7QYFxk1JgLDe44Rv800LhIF9Xlp",
    STRIPE_PRIVATE_KEY:
      "sk_test_51P7xrs2NTym58lhPXSRB1VaUw0kpf3Y5EHl1gpFlaURdjPBuBllalJP2Q79avCiVt2zWMJCDEjyAj2FsLhq1ufLH00uoWZ6ab9",

    STRIPE_WEBHOOK_SECRET:
      "whsec_e82b9d968090e817effbe4fc83996153df0a96762b087650aa899ac99201e0d3",

    NEXTAUTH_SECRET: "codingwitholah",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
