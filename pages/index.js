import Head from "next/head";
import Layout from "../components/Layout";

import Link from "next/link";

import ListItem from "@/components/ListItem";
import { getDataForHome } from "../lib/api";
import { SITE_META } from "../lib/constants";

export default function Home({ data }) {
  console.log(`data: `, data);
  // console.log(`categories: `, categories);
  return (
    <Layout>
      <Head>
        <title>{SITE_META.NAME + ` | ` + SITE_META.TAGLINE}</title>
        <meta name="description" content="Play the newest online casual games for free!" />
      </Head>

      <div className={`home`}>
        {data.map((i, index) => (
          <section key={i.category.slug}>
            <div className={`section-head`}>
              <h2 className={`h2`}>{i.category.name + ` Games`}</h2>
              {/* <span className="total">{i.data.total}</span> */}
            </div>
            <ul className={`section-body`}>
              {i.data.games.map((i) => (
                <ListItem item={i} type={`banner`} key={i.slug} />
                // <li className="list-item" key={i.slug}>
                //   <Link href={`/game/` + i.slug}>
                //     <Image
                //       className="image"
                //       src={getGameBanner(i.gid)}
                //       alt={i.title}
                //       width={100}
                //       height={100}
                //       loading={index <= 1 ? `eager` : `lazy`}
                //     />
                //     <div className="title">{i.title}</div>
                //   </Link>
                // </li>
              ))}
            </ul>
            {i.data.total > 6 ? (
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
  const data = await getDataForHome();

  return {
    props: {
      data,
      // categories,
    },
  };
};
