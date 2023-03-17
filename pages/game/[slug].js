import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import List from "../../components/List";
// import ListItem from "../../components/ListItem";
import data from "../../data/games.json";
import {
  getCategories,
  getDataForAll,
  getGameByIdAndRelated,
  getGameUrl,
  getImageUrl,
  getGamesByCategory,
  simplifyData,
} from "../../lib/api/gamepix";
import { SITE_META } from "../../lib/constants";
import getGameIcon from "@/utils/getGameIcon";

export default function Game({ game, relatedGames }) {
  // console.log(`game: `, game);
  // console.log(`relatedGames: `, relatedGames);
  // useEffect(() => {
  //   // 推送Play按钮点击数据
  //   function handleClick(e) {
  //     process.env.NODE_ENV === `development` ? e.preventDefault() : null;
  //     console.log(`Event: `, e);
  //     gtag && gtag("event", "click_CTA", { game: game?.title });
  //   }
  //   const CTA = document.querySelector(".play-btn");
  //   CTA.addEventListener("click", handleClick);
  // }, [game?.title]);
  // return (
  //   <Layout>
  //     <Head>
  //       <title>{`Play ` + game?.title + ` on ` + SITE_META.NAME}</title>
  //     </Head>
  //     <div className="detail max-w-5xl mx-auto">
  //       <section className="mx-8 xl:mx-0">
  //         <div className="game-meta">
  //           <Image
  //             className="image"
  //             src={getGameIcon(game?.id)}
  //             width={200}
  //             height={200}
  //             alt={game?.title}
  //             loading={`eager`}
  //           />
  //           <div>
  //             <h1 className="title">{game.title}</h1>
  //             <div className="game-info">
  //               <div className="game-rating">
  //                 <span>{game?.rating}</span>
  //               </div>
  //               <Link href={`/category/` + game?.category.toLowerCase()} className="game-category">
  //                 {game?.category}
  //               </Link>
  //             </div>
  //           </div>
  //         </div>
  //         <Link
  //           href={getGameUrl(game?.title)}
  //           className="play-btn"
  //           title={`Play ` + game?.title + ` Now`}
  //         >
  //           Play Now
  //         </Link>
  //         <div className="description">
  //           <h3 className="font-bold mb-2">Description</h3>
  //           {game?.description}
  //         </div>
  //       </section>
  //       <section>
  //         <div className="section-head">
  //           <h2 className="h2">You may also like</h2>
  //         </div>
  //         <List items={relatedGames} />
  //       </section>
  //     </div>
  //   </Layout>
  // );
}

export const getStaticProps = async (ctx) => {
  // const data = await getGameByIdAndRelated(ctx.params.id);
  // console.log(`detail game data`, data);
  console.log(`ctx`, ctx);
  return {
    props: {
      game: `data.game`,
      relatedGames: `data.related`,
    },
  };
};

export const getStaticPaths = async () => {
  // 取分类
  const categories = await getCategories();
  // console.log(`detai categories: `, categories);

  let data = [];
  for (const item of categories) {
    const tmp = await getGamesByCategory({ category: item.name.toLowerCase(), per_page: 12 });
    data = data.concat(tmp.data);
    // data.push({
    //   // category: item.name,
    //   data: simplifyData(tmp.data),
    //   // total: tmp.total,
    // });
  }

  // const data = await getDataForAll();
  console.log(`detail path data: `, data.length);
  const paths = data.map((i) => ({ params: { slug: i.slug } }));
  return {
    paths,
    fallback: false,
  };
};
