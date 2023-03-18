// Fetcher
export async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const { errors, data } = await res.json();
  if (errors) {
    console.error(errors);
  }

  return data;
}

// 获取分类列表
export const getCategories = async () => {
  return await fetchAPI(`
    query {
      categories {
        name
        slug
      }
    }
  `).then((res) => res.categories);
};

// 首页数据

export const getDataForHome = async (limit = 6) => {
  // 获取分类列表
  const categories = await getCategories();
  console.log(`home categories`, categories);
  // 基于分类筛选游戏
  let data = [];
  for (const item of categories) {
    const tmp = await fetchAPI(
      `
      query ($category: String, $limit: Int) {
        games (filter: { category: { name: { _eq: $category } } }, limit: $limit) {
          title
          slug
          gid
        }
        total: games_aggregated (filter: { category: { name: { _eq: $category } } }) {
          countDistinct { id }
        }
      }
    `,
      {
        variables: {
          category: item.name,
          limit: limit,
        },
      }
    );

    // console.log(`home tmp`, tmp);
    data.push({
      category: { name: item.name, slug: item.slug },
      data: { games: tmp?.games, total: tmp?.total?.[0]?.countDistinct?.id },
    });
  }

  console.log(`home data`, data);
  return data;
};

// 全部游戏
export const getDataForAll = async (limit = 48) => {
  // 获取分类列表
  const categories = await getCategories();
  console.log(`all categories`, categories);
  // 基于分类筛选游戏
  let data = [];
  for (const item of categories) {
    const tmp = await fetchAPI(
      `
      query ($category: String, $limit: Int) {
        games (filter: { category: { name: { _eq: $category } } }, limit: $limit) {
          title
          slug
          gid
        }
        total: games_aggregated (filter: { category: { name: { _eq: $category } } }) {
          countDistinct { id }
        }
      }
    `,
      {
        variables: {
          category: item.name,
          limit: limit,
        },
      }
    );

    // console.log(`home tmp`, tmp);
    data = data.concat(tmp?.games);
  }

  console.log(`all data`, data);
  return data;
};

// 分类页数据

export const getGamesByCategorySlug = async (slug, limit = 24) => {
  const data = await fetchAPI(
    `
    query ($category: String, $limit: Int) {
      games (filter: { category: { slug: { _eq: $category } } }, limit: $limit) {
        title
        slug
        gid
      }
      category: categories ( filter: { slug: { _eq: $category } } ) {
        name
      }
      total: games_aggregated (filter: { category: { slug: { _eq: $category } } }) {
        countDistinct { id }
      }
    }
  `,
    {
      variables: {
        limit: limit,
        category: slug,
      },
    }
  );
  console.log(`cat data`, data);
  return data;
};

// 详情页数据

export const getGameBySlug = async (slug, limit = 24) => {
  const data = await fetchAPI(
    `
    query ($slug: String, $limit: Int) {
      games ( filter: { slug: { _eq: $slug } } ) {
        title
        slug
        gid
        description
        rating
        category { name, slug }
      }
      related: games ( filter: { slug: { _neq: $slug } }, limit: $limit ) {
        title
        slug
        gid
      }
    }
    `,
    {
      variables: {
        limit: limit,
        slug: slug,
      },
    }
  );
  // console.log(`detail data`, data);
  return data;
};
