/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: "https://testvercel02-3r2rg098c-gejza-olahs-projects.vercel.app", 
    //API_URL:"http://localhost:3000",
    //DB_LOCAL_URI: "mongodb://localhost:27017/olahbakalar",
    DB_URI: "mongodb+srv://olahgeza:Olahocska2@olahbakalar.yv2udmt.mongodb.net/?retryWrites=true&w=majority&appName=olahbakalar", //console mongodb csatlakozas

    //NEXTAUTH_URL: "https://olah-bc-munka-4h01ggtyk-gejza-olahs-projects.vercel.app",

    CLOUD_NAME: "dsurojky9",
    CLOUDINARY_API_KEY: "731659276394317",
    CLOUDINARY_API_SECRET: "cjQM1B4g8GyEHt9R2T4PV-IbRQY",

    STRIPE_PUBLIC_KEY: "pk_test_51P4PnHDgFzb6Zjjz6lFB6oZKN4nn2ohKIWO5yb8LQKC1Fdr9UzyjZvGsQcp5frjeChkbYqd3qs5bNt531Vo1OSMu00S2iWejqT",
    STRIPE_PRIVATE_KEY: "sk_test_51P4PnHDgFzb6Zjjz7abM19KGSqwibIrEOHO1i0MHnTr2uLvmYyRij54G1tgB79i5Y7Mc0w0X8BfgixcQF06hVFUI00Mee6oHwL",

    STRIPE_WEBHOOK_SECRET: "whsec_77a4d586f0513585cbdebc9eaab08778065958b128803670eff5712a66c08db1",

    NEXTAUTH_SECRET: "codingwitholah",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
