import Image from "next/image";
import Head from "next/head";
import Layout from "../components/Layout";

import Link from "next/link";

import { SITE_META } from "../lib/constants";
import { dataForHome, getImageUrl } from "../lib/api/gamepix";
import data from "../data/games";
import getGameIcon from "@/utils/getGameIcon";
import getGameBanner from "@/utils/getGameBanner";
import { getAllGames, getCategories } from "@/lib/api/io";
import { useEffect } from "react";

import { addNewCategories, addNewGames, updateGames } from "@/lib/api/io";

export default function Home({ data }) {
  // console.log(`data: `, data);
  // console.log(`categories: `, categories);
  useEffect(() => {}, []);
  return (
    <Layout>
      <Head>
        <title>{SITE_META.NAME + ` | ` + SITE_META.TAGLINE}</title>
        <meta name="description" content="Editor for Games Content" />
      </Head>

      <div className={`home`}>
        <section>
          <div className="section-head">
            <h2 className="h2">Categories</h2>
            <span className="total">{data.categories.length}</span>
          </div>
          <ul className="section-body">
            {data.categories.map((i) => (
              <li className="list-item" key={i.name}>
                {i.name}
              </li>
            ))}
          </ul>
          <button
            disabled
            className="add-data-button bg-emerald-600 text-white p-4 my-4 mx-8"
            onClick={addNewCategories}
          >
            Add Categories
          </button>
        </section>
        <section>
          <div className="section-head">
            <h2 className="h2">Games</h2>
            <span className="total">{`games amount`}</span>
          </div>
          <button
            disabled
            className="add-data-button bg-emerald-600 text-white p-4 my-4 mx-8"
            onClick={addNewGames}
          >
            Add Games
          </button>
          <button
            disabled
            className="add-data-button bg-emerald-600 text-white p-4 my-4 mx-8"
            onClick={updateGames}
          >
            Update Games
          </button>
        </section>
        {data.games?.map((i, index) => (
          <section key={i.section}>
            <div className={`section-head`}>
              <h2 className={`h2`}>{i.section + ` Games`}</h2>
              <span className="total">{i.data.length}</span>
            </div>
            <ul className={`section-body`}>
              {i?.data.slice(0, 6).map((i) => (
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
            {i?.data.length > 6 ? (
              <Link href={`/category/` + i.section.toLowerCase()} className="link-more">
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
  // const data = await dataForHome();
  const categories = await getCategories();

  // console.log(`categories: `, categories);

  const games = await getAllGames({ mode: `section`, limit: 12 });

  return {
    props: {
      data: {
        games,
        categories,
      },
    },
  };
};
