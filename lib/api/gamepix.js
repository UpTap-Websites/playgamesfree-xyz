/*
  GamePix Games
*/

// 数据获取
async function fetchAPI({ per_page = 24, page = 1, q = true } = {}) {
  if (typeof per_page !== "number" || typeof page !== "number" || typeof q !== "boolean") {
    throw new Error("Invalid argument type");
  }
  try {
    const API_URL = q === true ? "" : "&order=pubdate&";
    // console.log(`API_URL: `, API_URL);
    const data = await fetch(
      `https://feeds.gamepix.com/v1/json?sid=999P9&${API_URL}pagination=${per_page}&page=${page}`
    ).then((res) => res.json());

    return data.items;
  } catch (e) {
    console.error(e);
  }
}

// 数据简化
export function simplifyData(data) {
  // console.log(`simplifyData - data: `, data);
  let games = [];
  data?.map((i) => {
    games.push({
      id: i.id,
      title: i.title,
      slug: i.namespace,
      // category: i.category,
      // orientation: i.orientation,
    });
  });

  return games;
}

// 提取 URL 查询参数
function getParamsFromUrl(url) {
  const params = new URLSearchParams(new URL(url).search);
  const result = {};
  params.forEach((value, key) => {
    if (!result[key]) {
      result[key] = value;
    } else if (Array.isArray(result[key])) {
      result[key].push(value);
    } else {
      result[key] = [result[key], value];
    }
  });
  return result;
}

// 根据 URL 提取总数

// 首页数据
export const dataForHome = async () => {
  // 按分类
  const categories = await getCategories();
  console.log(`categories: `, categories);

  let data = [];
  for (const item of categories) {
    const tmp = await getGamesByCategory({ category: item.name.toLowerCase(), per_page: 12 });
    data.push({
      category: item.name,
      data: simplifyData(tmp.data),
      total: tmp.total,
    });
  }

  // console.log(`dataForHome(): `, data);

  return data;
};

// 全部游戏页数据
export const getDataForAll = async () => {
  const data = await fetchAPI({ per_page: 48, page: 1, q: false });

  return { games: simplifyData(data) };
};

// 所有分类
export const getCategories = async () => {
  const json = await fetch(`https://games.gamepix.com/categories`).then((res) => res.json());

  return json?.data;
};

// 根据分类名获取分类id
const getCategoryIdByName = async (name) => {
  const categories = await getCategories();
  return categories.find((i) => i.name === name)?.id;
};

// 根据分类名获取该分类下游戏数量
const getGamesCountByCategory = async (name) => {
  const PER_PAGE = 24;
  // 1. 获取 lastpage
  const url = await fetch(
    `https://feeds.gamepix.com/v1/json?sid=999P9&category=${name.toLowerCase()}&pagination=${PER_PAGE}&page=1`
  )
    .then((res) => res.json())
    .then((json) => json.last_page_url);

  // console.log(`url: `, url);
  // 2. 提取 lastpage 的参数
  const MAX_PAGE = getParamsFromUrl(url)?.page;
  // 3. 计算总数
  const GAMES_ON_LAST_PAGE = await fetch(url)
    .then((res) => res.json())
    .then((json) => json.items.length);
  // console.log(`GAMES_ON_LAST_PAGE: `, GAMES_ON_LAST_PAGE);

  return (MAX_PAGE - 1) * PER_PAGE + GAMES_ON_LAST_PAGE;
};

// 分类页数据
export const getGamesByCategory = async ({ category, per_page = 24, page = 1 } = {}) => {
  // 获取游戏
  const data = await fetch(
    `https://feeds.gamepix.com/v1/json?sid=999P9${
      category ? `&category=${category.toLowerCase()}&` : ""
    }&pagination=${per_page}&page=${page}`
  )
    .then((res) => res.json())
    .then((json) => json.items);
  // console.log(`data____`, data);
  // 获取总数
  const total = await getGamesCountByCategory(category);
  return { data: simplifyData(data), total };
};

// 详情页数据
export const getGameByIdAndRelated = async (id) => {
  const data = await fetch(`https://games.gamepix.com/game?sid=999P9&gid=${id}`)
    .then((res) => res.json())
    .then((json) => json.data);

  console.log(`detai data: `, data);

  // 提取当前游戏详情所需数据
  const currentGame = {
    id: data.id,
    title: data.title,
    slug: data.namespace,
    category: data.category,
    description: data.description,
    orientation: data.orientation,
  };

  // 筛选相关游戏

  return {
    game: currentGame,
    related: ``,
  };
};
