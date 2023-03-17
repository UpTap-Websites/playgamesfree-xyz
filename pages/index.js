import Image from "next/image";
import Head from "next/head";
import Layout from "../components/Layout";

import Link from "next/link";

import { SITE_META } from "../lib/constants";
import { dataForHome, getImageUrl } from "../lib/api/gamepix";
import data from "../data/games";
import getGameIcon from "@/utils/getGameIcon";
import getGameBanner from "@/utils/getGameBanner";

export default function Home({ games }) {
  console.log(`games: `, games);
  // console.log(`categories: `, categories);
  return (
    <Layout>
      <Head>
        <title>{SITE_META.NAME + ` | ` + SITE_META.TAGLINE}</title>
        <meta name="description" content="Play the newest online casual games for free!" />
      </Head>

      <div className={`home`}>
        {/* {games?.map((i, index) => (
          <section key={i.category}>
            <div className={`section-head`}>
              <h2 className={`h2`}>{i.category + ` Games`}</h2>
              <span className="total">{i.total}</span>
            </div>
            <ul className={`section-body`}>
              {i?.data.map((i) => (
                <li className="list-item" key={i.id}>
                  <Link href={`/game/` + i.slug}>
                    <Image
                      className="image"
                      src={getGameIcon(i.id)}
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
            {i?.total > 12 ? (
              <Link href={`/category/` + i.category.toLowerCase()} className="link-more">
                More
              </Link>
            ) : null}
          </section>
        ))} */}
      </div>
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  const data = await dataForHome();

  return {
    props: {
      games: ``,
      // categories,
    },
  };
};
