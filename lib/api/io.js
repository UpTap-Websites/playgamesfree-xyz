//
import { headers } from "@/next.config";
import getParamsFromUrl from "@/utils/getParamsFromUrl";
import simplifyData from "@/utils/simplifyData";

const SID = `999P9`;
const CATEGORIES_API_URL = `https://games.gamepix.com/categories`;
const SINGLE_GAME_API_URL = `https://games.gamepix.com/game?sid=${SID}&gid=`;

const PER_PAGE = 24;

const FEED_GAMES_API_URL = `https://feeds.gamepix.com/v1/json?sid=${SID}&pagination=${PER_PAGE}&page=`;

const FEED_GAMES_BY_CATEGORY_API_URL = `https://feeds.gamepix.com/v1/json?sid=${SID}&category=adventure&pagination=${PER_PAGE}&page=`; // 获取最大页数后循环

// 1. 获取 GamePix 数据

// 1.1 获取分类数据
export const getCategories = async () => {
  const categories = await fetch(CATEGORIES_API_URL).then((res) => res.json());
  const data = categories.data.map((i) => ({
    name: i.name,
    description: i.description || ``,
    cid: i.id,
  }));

  return data;
};

// 1.2 获取游戏
export const getAllGames = async ({ mode = `all`, limit = PER_PAGE } = {}) => {
  const categories = await getCategories();
  let allGames = [];
  for (const item of categories) {
    const data = await fetch(
      `https://feeds.gamepix.com/v1/json?sid=${SID}&category=${item.name.toLowerCase()}&pagination=${limit}&page=1`
    )
      .then((res) => res.json())
      .then((json) => json.items);
    if (mode === `all`) {
      allGames = allGames.concat(simplifyData(data));
    } else if (mode === `section`) {
      allGames = allGames.concat({ section: item.name, data: simplifyData(data) });
    }
  }

  return allGames;
};

// 获取最大页数

// 计算总数

// 2. 写入 CMS
async function fetchAPI(query, { variables } = {}, type = "POST") {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(`Failed to fetch API: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}
// 2.1 写入分类数据
export const addNewCategories = async () => {
  const categories = await getCategories();
  try {
    for (const item of categories) {
      // 单条写入
      const data = {
        cid: item.cid,
        name: item.name,
        slug: item.name.toLowerCase(),
        description: item.description || ``,
        status: "draft",
      };
      console.log(`data >>`, data);

      await fetchAPI(
        `
        mutation ($data: create_categories_input!) {
          create_categories_item (data: $data) {
            id
          }
        }
      `,
        {
          variables: {
            data: data,
          },
        }
      );
    }
  } catch (e) {
    console.error(e);
  }
};

// 2.2 写入游戏数据
export const addNewGames = async () => {
  try {
    // 获取 CMS 分类数据
    const cms_categories = await fetchAPI(`
      query {
        categories {
          id
          cid
          name
        }
      }
    `).then((res) => res?.categories);

    // 获取分页长度
    console.log(`cms_categories`, cms_categories);
    let data = [];
    for (const item of cms_categories) {
      const PER_PAGE = 48;
      console.log(`item`, item);
      // 1. 获取 lastpage
      const url = await fetch(
        `https://feeds.gamepix.com/v1/json?sid=999P9&category=${item.name.toLowerCase()}&pagination=${PER_PAGE}&page=1`
      )
        .then((res) => res.json())
        .then((json) => json.last_page_url);

      // console.log(`url: `, url);
      // 2. 提取 lastpage 的参数
      const MAX_PAGE = getParamsFromUrl(url)?.page;
      // 写入游戏数据
      // let tmp_data = [];
      for (let i = 1; i <= MAX_PAGE; i++) {
        const tmp = await fetch(
          `https://feeds.gamepix.com/v1/json?sid=999P9&category=${item.name.toLowerCase()}&pagination=${PER_PAGE}&page=${i}`
        )
          .then((res) => res.json())
          .then((json) => json.items);

        const tmpData = tmp.map((i) => ({
          gid: i.id,
          title: i.title,
          slug: i.namespace,
          description: i.description,
          orientation: i.orientation,
          published_date: i.date_published,
          updated_date: i.date_modified,
          rating: i.quality_score,
          height: i.height,
          width: i.width,
          category: { id: item.id * 1, status: "draft" }, // 要转成id
          status: "draft",
        }));

        await fetchAPI(
          `
            mutation ( $data: [create_games_input!] ){
              create_games_items (data: $data) {
                id
              }
            }
          `,
          {
            variables: {
              data: tmpData,
            },
          }
        );

        console.log(`tmpData`, tmpData);
        data = data.concat(tmpData);
      }
    }
    console.log(`data ...`, data.length);
    // （按分类）循环分页，获取游戏数据并写入
  } catch (e) {
    console.error(e);
  }
};

// 2.2 更新游戏数据
export const updateGames = async () => {
  try {
    // 获取全部需要更新的游戏（id，gid）
    const games = await fetchAPI(`
      query {
        games (limit: -1) {
          id
          gid
        }
      }
    `).then((res) => res.games);
    console.log(`games`, games[0]);
    // 获取全部源数据
    const MAX_PAGE = 43;
    let original = [];

    for (let i = 1; i <= MAX_PAGE; i++) {
      const data = await fetch(
        `https://feeds.gamepix.com/v1/json?sid=999P9&pagination=96&page=${i}`
      )
        .then((res) => res.json())
        .then((json) => json.items);
      const tmp = data.map((i) => ({
        gid: i.id,
        published_date: new Date(i.date_published).toISOString(),
        updated_date: new Date(i.date_modified).toISOString(),
      }));
      original = original.concat(tmp);
    }
    console.log(`original`, original.length);
    // 测试更新单个游戏
    // const data = original.find((i) => i.gid === games[0].gid);
    // // const data = await fetch(`${SINGLE_GAME_API_URL}${games[0].gid}`)
    // // .then((res) => res.json())
    // // .then((json) => ({
    // //   published_date: json.data.approval_date,
    // //   updated_date: json.data.lastUpdate,
    // // }));
    // console.log(`data///`, data);
    // const result = await fetchAPI(
    //   `
    //     mutation ($id: ID!, $data: update_games_input!) {
    //       update_games_item (id: $id, data: $data) {
    //         published_date
    //         updated_date
    //       }
    //     }
    //   `,
    //   {
    //     variables: {
    //       data: data,
    //       id: games[0].id * 1,
    //     },
    //   }
    // );

    // console.log(`result`, result);

    // 遍历读取源数据，提取数据、更新数据
    for (const item of games) {
      // 根据gid获取源数据
      const data = original.find((i) => i.gid === item.gid);
      console.log(`data///`, data);
      const result = await fetchAPI(
        `
        mutation ($id: ID!, $data: update_games_input!) {
          update_games_item (id: $id, data: $data) {
            published_date
            updated_date
          }
        }
      `,
        {
          variables: {
            data: data,
            id: item.id * 1,
          },
        }
      );
      console.log(`result`, result);
    }
  } catch (e) {
    console.error(e);
  }
};
