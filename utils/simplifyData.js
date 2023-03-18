export default function simplifyData(data) {
  // 数据简化
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
