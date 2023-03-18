/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.playgamesfree.xyz",
  // generateRobotsTxt: true, // (optional)
  // ...other options
  exclude: ["/privacy", "/terms"],
};

// export default config;
