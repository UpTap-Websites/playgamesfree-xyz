import Head from "next/head";

import Layout from "../components/Layout";

import { SITE_META } from "../lib/constants";

import { getDataForAll } from "../lib/api";

import ListItem from "@/components/ListItem";

export default function AllGames({ games }) {
  console.log(`all games: `, games);
  return (
    <Layout>
      <Head>
        <title>{SITE_META.NAME + ` | ` + SITE_META.TAGLINE}</title>
        <meta name="description" content="Play the newest online casual games for free!" />
      </Head>

      <div className={`all xl:mx-auto`}>
        <section>
          <div className={`section-head`}>
            <h2 className={`h2`}>All Games</h2>
            <span className="total">{games.length}</span>
          </div>
          <ul className={`section-body`}>
            {games.map((i, index) => (
              <ListItem item={i} key={i.slug} />
              // <li key={i.slug} className="list-item">
              //   <Link href={`/game/` + i.slug}>
              //     <Image
              //       className="image"
              //       src={getGameIcon(i.gid)}
              //       alt={i.title}
              //       width={100}
              //       height={100}
              //       loading={index <= 9 ? `eager` : `lazy`}
              //     />
              //     <div className="title">{i.title}</div>
              //   </Link>
              // </li>
            ))}
          </ul>
          {/* <Link href={`/category`}>
            <a className="link-more">More</a>
          </Link> */}
        </section>
      </div>
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  const data = await getDataForAll();
  return {
    props: {
      games: data,
    },
  };
};
