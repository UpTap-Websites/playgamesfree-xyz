import Layout from "@/components/Layout";
import List from "@/components/List";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
// import ListItem from "../../components/ListItem";
import { fetchAPI, getCategories, getGameBySlug } from "@/lib/api";
import { SITE_META } from "@/lib/constants";
import getGameIcon from "@/utils/getGameIcon";
import getGameUrl from "@/utils/getGameUrl";
import AdScript from "@/components/AdScript";
import AdSense from "@/components/AdSense";

import { demoData } from "@/data/detail";

export default function Game({ game, relatedGames }) {
  console.log(`game: `, JSON.stringify(game));
  console.log(`relatedGames: `, JSON.stringify(relatedGames));

  useEffect(() => {
    // 推送Play按钮点击数据
    const gameUrl = getGameUrl(game.slug);
    const PLAYER = document.querySelector(".player");
    const CTA = document.querySelector(".play-btn");
    const backBtn = document.querySelector(".back-btn");
    const gameIframe = document.querySelector(".game-iframe");
    const BODY = document.querySelector("body");
    const DESC = document.querySelector(".description");

    function handleClickPlay(e) {
      process.env.NODE_ENV === `development` ? e.preventDefault() : null;
      console.log(`Event: `, e);
      gtag && gtag("event", "click_CTA", { game: game.title });
      gameIframe.src = gameUrl; // 关闭后再打开时赋值
      PLAYER.classList.toggle("hidden");
      BODY.classList.toggle("overflow-hidden");
    }

    function handleClickBack(e) {
      BODY.classList.remove("overflow-hidden");
      PLAYER.classList.add("hidden");
      gameIframe.src = "";
    }

    function handleClickDesc(e) {
      DESC.classList.toggle("show-all");
    }

    DESC.addEventListener("click", handleClickDesc);
    CTA.addEventListener("click", handleClickPlay);
    backBtn.addEventListener("click", handleClickBack);

    return () => {
      DESC.removeEventListener("click", handleClickDesc);
      CTA.removeEventListener("click", handleClickPlay);
      backBtn.removeEventListener("click", handleClickBack);
    };
  }, [game]);
  return (
    <Layout>
      <Head>
        <title>{`Play ${game.title} on ${SITE_META.NAME}`}</title>
        <meta name="description" content={`Play ${game.title} on ${SITE_META.NAME}`} />
        <link rel="canonical" href={`https://www.playgamesfree.xyz/game/${game.slug}`} />
      </Head>
      <AdScript />
      <div className="detail mx-auto grid xl:grid-cols-12 xl:gap-8 xl:mx-8">
        <section className="xl:flex xl:flex-col mx-8 xl:grow xl:mx-0 xl:order-2 xl:col-span-6">
          <div className="player hidden xl:mb-4 fixed inset-0 xl:block xl:static bg-black/90 backdrop-blur z-10">
            <div className="back-btn text-xs uppercase p-4 pl-2 top-1 left-0 rounded-r-full bg-emerald-500 text-white xl:hidden absolute overflow-hidden z-20">
              <b>back</b>
            </div>
            <iframe className="game-iframe" src={getGameUrl(game.slug)}></iframe>
          </div>
          <div className="game-meta flex flex-col items-center mb-6 xl:flex-row">
            <Image
              className="image rounded-[2rem] border-4 border-amber-300 w-32 h-32 xl:mr-3 xl:w-28 xl:h-28 xl:shadow-xl xl:shadow-amber-200"
              src={getGameIcon(game.gid)}
              width={200}
              height={200}
              alt={game.title}
              loading={`eager`}
            />
            <div>
              <h1 className="title text-2xl leading-6 my-2 xl:mb-2 font-black text-emerald-700">
                {game.title}
              </h1>
              <div className="game-info mx-auto flex gap-2 items-center justify-center xl:justify-start">
                <div className="game-rating">
                  <span>{(game.rating * 10).toFixed(1)}</span>
                </div>
                <Link href={`/category/${game.category.slug}`} className="game-category">
                  {game.category.name}
                </Link>
              </div>
            </div>
          </div>
          <Link
            href={getGameUrl(game.slug)}
            className="play-btn mx-auto xl:hidden"
            title={`Play ` + game.title + ` Now`}
          >
            Play Now
          </Link>
          <div className="description grow">
            <h3 className="font-bold mb-2">Description</h3>
            <div className="content" dangerouslySetInnerHTML={{ __html: game.description }} />
          </div>
          <div className="popular">
            <div className="section-head">
              <h2 className="h2">You may also like</h2>
            </div>
            <List items={relatedGames.slice(0, 12)} type={`banner`} />
          </div>
        </section>
        <aside className="xl:order-1 xl:col-span-3">
          <div className="mb-6">
            <AdSense />
          </div>
          <List items={relatedGames.slice(12, 30)} type="banner" />
        </aside>
        <aside className="xl:order-3 xl:col-span-3">
          <div className="mb-6">
            <AdSense />
          </div>
          <List items={relatedGames.slice(30)} type="banner" />
        </aside>
      </div>
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  const data = await getGameBySlug(ctx.params.slug, 48);

  return {
    props: {
      game: data?.games[0],
      relatedGames: data?.related,
      // game: demoData.game,
      // relatedGames: demoData.relatedGames,
    },
  };
};

export const getStaticPaths = async () => {
  const PER_PAGE = 48;
  // 按分类取
  const categories = await getCategories();
  // console.log(`detai ..categories`, categories);
  let data = [];
  for (const item of categories) {
    // console.log(`slug`, item.slug);
    const tmp = await fetchAPI(
      `
        query ($category: String, $limit: Int ){
          games (filter: { category: { slug: { _eq: $category } } }, limit: $limit) {
            slug
          }
        }
      `,
      {
        variables: {
          limit: PER_PAGE,
          category: item.slug,
        },
      }
    );

    data = data.concat(tmp.games.map((i) => i.slug));
  }
  // console.log(`detail data`, data);
  const paths = data.map((i) => ({ params: { slug: i } }));
  return {
    paths,
    fallback: false,
  };
};
