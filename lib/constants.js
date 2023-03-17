export const MODE = `dev`; // 广告模式，设置为 dev 则启用 adtest="on"

export const SITE_META = {
  NAME: `PlayGamesFree`, // 网站名称
  URL: `https://www.playgamesfree.xyz`, // 网站网址
  DOMAIN: `playgamesfree.xyz`, // 网站域名
  TAGLINE: `Free Online Games to Play`, // 网站标语或口号
};

export const GAMEPIX_FEED_API = ({ per_page = 24, page = 1 }) =>
  `https://feeds.gamepix.com/v1/json?pagination=${per_page}&page=${page}`;

export const GA_ID = `G-NGLDNCR5SH`; // Google Analytics ID

export const ADSENSE_ID = ``; // Google Adsense ID
export const ADS_SLOTS_ID = {
  home: ``, // 首页广告ID
  categorgy: ``, // 分类页广告ID
  detail: ``, // 详情页广告ID
};

export const SELECTED_GAMES = []; //选择游戏
export const EXCLUED_GAMES = ["HouseLink"]; //排除游戏
export const FEATURED_GAMES = ["FireTheGun", "CrazyKnife", "CrazyMoto"]; // 首页推荐游戏
