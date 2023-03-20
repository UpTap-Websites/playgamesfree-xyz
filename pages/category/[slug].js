import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";

import Link from "next/link";
import { SITE_META } from "@/lib/constants";

import { getCategories, getGamesByCategorySlug } from "@/lib/api";
import getGameIcon from "@/utils/getGameIcon";
import AdScript from "@/components/AdScript";

export default function Category({ games, category, total }) {
  console.log(`games: `, games);
  return (
    <Layout>
      <Head>
        <title>{category.name + ` Games | ` + SITE_META.NAME}</title>
        <meta name="description" content={`Play ${category.name} games on ${SITE_META.NAME}`} />
        <link rel="canonical" href={`https://www.playgamesfree.xyz/category/${category.slug}`} />
      </Head>
      <AdScript />
      <div className={`category`}>
        <section>
          <div className={`section-head`}>
            <h2 className={`h2`}>{category.name + ` Games`}</h2>
            {/* <span className="total">{total}</span> */}
          </div>
          <ul className={`section-body`}>
            {games.map((i, index) => (
              <li key={i.slug} className="list-item">
                <Link href={`/game/` + i.slug}>
                  <Image
                    className="image"
                    src={getGameIcon(i.gid)}
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
  console.log(`ctx >>`, ctx);
  const data = await getGamesByCategorySlug(ctx.params.slug, 48);

  return {
    props: {
      games: data.games,
      total: data.total[0].countDistinct.id,
      category: { name: data.category?.[0].name, slug: ctx.params.slug },
    },
  };
};

export const getStaticPaths = async () => {
  const categories = await getCategories();
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
