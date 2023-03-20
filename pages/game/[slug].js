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

export default function Game({ game, relatedGames }) {
  console.log(`game: `, game);
  console.log(`relatedGames: `, relatedGames);
  useEffect(() => {
    // 推送Play按钮点击数据
    function handleClick(e) {
      process.env.NODE_ENV === `development` ? e.preventDefault() : null;
      console.log(`Event: `, e);
      gtag && gtag("event", "click_CTA", { game: game.title });
    }
    const CTA = document.querySelector(".play-btn");
    CTA.addEventListener("click", handleClick);
  }, [game.title]);
  return (
    <Layout>
      <Head>
        <title>{`Play ${game.title} on ${SITE_META.NAME}`}</title>
        <meta name="description" content={`Play ${game.title} on ${SITE_META.NAME}`} />
        <link rel="canonical" href={`https://www.playgamesfree.xyz/game/${game.slug}`} />
      </Head>
      <AdScript />
      <div className="detail max-w-5xl mx-auto">
        <section className="mx-8 xl:mx-0">
          <div className="game-meta">
            <Image
              className="image"
              src={getGameIcon(game.gid)}
              width={200}
              height={200}
              alt={game.title}
              loading={`eager`}
            />
            <div>
              <h1 className="title">{game.title}</h1>
              <div className="game-info">
                <div className="game-rating">
                  <span>{Math.round(game.rating * 10)}</span>
                </div>
                <Link href={`/category/${game.category.slug}`} className="game-category">
                  {game.category.name}
                </Link>
              </div>
            </div>
          </div>
          <Link
            href={getGameUrl(game.slug)}
            className="play-btn"
            title={`Play ` + game.title + ` Now`}
          >
            Play Now
          </Link>
          <div className="description">
            <h3 className="font-bold mb-2">Description</h3>
            <div dangerouslySetInnerHTML={{ __html: game.description }} />
          </div>
        </section>
        <section>
          <div className="section-head">
            <h2 className="h2">You may also like</h2>
          </div>
          <List items={relatedGames} type={`banner`} />
        </section>
      </div>
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  const data = await getGameBySlug(ctx.params.slug, 12);

  return {
    props: {
      game: data?.games[0],
      relatedGames: data?.related,
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
