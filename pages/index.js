import Head from "next/head";
import Layout from "@/components/Layout";

import Link from "next/link";

import ListItem from "@/components/ListItem";
import { getDataForHome } from "@/lib/api";
import { SITE_META } from "@/lib/constants";
import AdScript from "@/components/AdScript";
import Microformat from "@/components/Microformat";
import Image from "next/image";
import Icons from "@/components/Icons";

export default function Home({ data }) {
  console.log(`data: `, data);
  // console.log(`categories: `, categories);
  return (
    <Layout>
      <Head>
        <title>{SITE_META.NAME + ` | ` + SITE_META.TAGLINE}</title>
        <meta name="description" content="Play online games for free!" />
        <link rel="canonical" href="https://www.playgamesfree.xyz" />
      </Head>
      <Microformat id="home" type="WebSite" />
      <AdScript />
      <div className={`home`}>
        {data.map((item, index) => {
          // item.data.games.sort(() => Math.random() - 0.5);
          return (
            <section key={item.category.slug}>
              <div className={`section-head`}>
                <Image
                  src={Icons(item.category.name)}
                  alt=""
                  width={20}
                  height={20}
                />
                <h2 className={`h2`}>{item.category.name + ` Games`}</h2>
                {/* <span className="total">{item.data.total}</span> */}
              </div>
              <ul className={`section-body`}>
                {item.data.games.map((item, index) =>
                  index > 0 ? (
                    <ListItem item={item} key={item.slug} />
                  ) : (
                    <ListItem item={item} type={`banner`} key={item.slug} />
                  )
                )}
              </ul>
              {item.data.total > 6 ? (
                <Link
                  href={`/category/` + item.category.slug}
                  className="link-more"
                  title="More"
                >
                  More
                </Link>
              ) : null}
            </section>
          );
        })}
      </div>
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  const data = await getDataForHome(12 + 1);

  return {
    props: {
      data,
      // categories,
    },
  };
};
