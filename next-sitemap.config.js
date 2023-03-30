/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.playgamesfree.xyz",
  generateRobotsTxt: true, // (optional)
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
  // ...other options
  exclude: ["/privacy", "/terms"],
};

// export default config;
