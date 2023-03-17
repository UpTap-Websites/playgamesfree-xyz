import Image from "next/image";
import Head from "next/head";
import Layout from "../../components/Layout";

import Link from "next/link";
import { SITE_META } from "../../lib/constants";

import data from "../../data/games";
import { getCategories, getGamesByCategory, getImageUrl } from "../../lib/api/gamepix";
import getGameIcon from "@/utils/getGameIcon";

export default function Category({ games, category, total }) {
  // console.log(`games: `, games);
  return (
    <Layout>
      <Head>
        <title>{category + ` Games | ` + SITE_META.NAME}</title>
        <meta name="description" content="Play the newest online casual games for free!" />
      </Head>

      <div className={`category`}>
        <section>
          <div className={`section-head`}>
            <h2 className={`h2`}>{category + ` Games`}</h2>
            <span className="total">{total}</span>
          </div>
          <ul className={`section-body`}>
            {games.map((i, index) => (
              <li key={i.slug} className="list-item">
                <Link href={`/game/` + i.slug}>
                  <Image
                    className="image"
                    src={getGameIcon(i.id)}
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
  // console.log(`params slug: `, ctx.params.slug);
  const data = await getGamesByCategory({ category: `${ctx.params.slug}`, per_page: 48 });
  return {
    props: {
      games: data.data,
      total: data.total,
      category: `${ctx.params.slug}`.replace(/^\S/, (s) => s.toUpperCase()),
    },
  };
};

export const getStaticPaths = async () => {
  const categories = await getCategories();
  const paths = categories.map((i) => ({
    params: {
      slug: i.name.toLowerCase(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
