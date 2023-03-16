import Image from "next/image";
import Head from "next/head";
import Layout from "../../components/Layout";

import Link from "next/link";
import { SITE_META } from "../../lib/constants";

import data from "../../data/games";
import { getImageUrl } from "../../lib/api";

export default function Category({ games, category }) {
  console.log(`games: `, games);
  return (
    <Layout>
      <Head>
        <title>{category.name + ` Games | ` + SITE_META.NAME}</title>
        <meta name="description" content="Play the newest online casual games for free!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`category`}>
        <section>
          <div className={`section-head`}>
            <h2 className={`h2`}>{category.name + ` Games`}</h2>
            <span className="total">{games.length}</span>
          </div>
          <ul className={`section-body`}>
            {games.map((i, index) => (
              <li key={i.slug} className="list-item">
                <Link href={`/game/` + i.slug}>
                  <Image
                    className="image"
                    src={getImageUrl(i.title)}
                    alt={i.title}
                    width={100}
                    height={100}
                    loading={index <= 9 ? `eager` : `lazy`}
                  />
                  <div className="title">{i.title}</div>
                </Link>
              </li>
            ))}
          </ul>
          {/* <Link href={`/category`} className="link-more">
            More
          </Link> */}
        </section>
      </div>
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  const basicData = data?.data?.basicData;

  let games = basicData.slice().filter((i) => i.category.slug === ctx.params.slug);
  games.forEach((element) => {
    delete element.id;
    delete element.rating;
    delete element.thumbnailUrl;
  });

  return {
    props: {
      games,
      category: games[0].category,
    },
  };
};

export const getStaticPaths = async () => {
  const categories = data?.data?.categories;
  const paths = categories.map((i) => ({
    params: {
      slug: i.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
