import Image from "next/image";
import Head from "next/head";
import Layout from "../components/Layout";

import Link from "next/link";

import { SITE_META } from "../lib/constants";
import { getImageUrl } from "../lib/api";
import data from "../data/games";

export default function Home({ games }) {
  console.log(`games: `, games);
  // console.log(`categories: `, categories);
  return (
    <Layout>
      <Head>
        <title>{SITE_META.NAME + ` | ` + SITE_META.TAGLINE}</title>
        <meta name="description" content="Play the newest online casual games for free!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`home`}>
        {games.map((i, index) => (
          <section key={i.category.slug}>
            <div className={`section-head`}>
              <h2 className={`h2`}>{i.category.name + ` Games`}</h2>
              <span className="total">{i.total}</span>
            </div>
            <ul className={`section-body`}>
              {i.data.map((i) => (
                <li className="list-item" key={i.slug}>
                  <Link href={`/game/` + i.slug}>
                    <Image
                      className="image"
                      src={getImageUrl(i.title)}
                      alt={i.title}
                      width={100}
                      height={100}
                      loading={index <= 1 ? `eager` : `lazy`}
                    />
                    <div className="title">{i.title}</div>
                  </Link>
                </li>
              ))}
            </ul>
            {i.total > 6 ? (
              <Link href={`/category/` + i.category.slug} className="link-more">
                More
              </Link>
            ) : null}
          </section>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  const dataForHome = data?.data?.dataForHome;
  // const categories = games.map((i) => i.category);
  let games = dataForHome.slice().sort((i) => (i.total < 6 ? 1 : -1)); // 数量小于6的分类排序后置

  games.forEach((i) => {
    i.data.forEach((element) => {
      delete element.id;
      delete element.thumbnailUrl;
      delete element.rating;
    });
  });

  return {
    props: {
      games,
      // categories,
    },
  };
};
