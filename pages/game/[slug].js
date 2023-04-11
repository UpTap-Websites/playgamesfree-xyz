import { PER_PAGE } from "@/lib/api";
import Layout from "@/components/Layout";
import List from "@/components/List";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
// import ListItem from "../../components/ListItem";
import { fetchAPI, getCategories, getGameBySlug } from "@/lib/api";
import { FEATURED_GAMES, SITE_META } from "@/lib/constants";
import getGameIcon from "@/utils/getGameIcon";
import getGameUrl from "@/utils/getGameUrl";
import AdScript from "@/components/AdScript";
import AdSense from "@/components/AdSense";

import Draggable from "react-draggable";
import Microformat from "@/components/Microformat";

// import { demoData } from "@/data/detail";

export default function Game({ game, relatedGames }) {
  // console.log(`game: `, JSON.stringify(game));
  // console.log(`relatedGames: `, JSON.stringify(relatedGames));

  const isFeatured = (id) => FEATURED_GAMES.includes(id);

  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const [isClick, setIsClick] = useState(false); // is Clicked

  const draggableRef = useRef(null);

  const gameUrl = getGameUrl(game.slug);

  function handleStart() {
    if (!draggableRef.current) {
      return;
    }
    setIsClick(true);
  }
  function handleDrag() {
    setIsClick(false);
  }
  function handleEnd() {
    if (isClick) {
      console.log(`isClick`, isClick);
      setIsPlayerOpen(false);
    }
  }

  useEffect(() => {
    const _body = document.querySelector("body"); // 用于添加overflow-hidden

    const _desc = document.querySelector(".description");

    const _playBtn = document.querySelector(".play-btn");
    const _player = document.querySelector(".player");
    const _gameIframe = document.querySelector(".game-iframe");

    const _backBtn = document.querySelector(".back-btn");

    if (isPlayerOpen) {
      _gameIframe.src = gameUrl; // 关闭后再打开时赋值
      _player.classList.remove("hidden");
      _body.classList.add("full-screen");
    } else {
      _player.classList.add("hidden");
      _body.classList.remove("full-screen");
    }

    // deal with the play button
    function handleClickPlay(e) {
      e.preventDefault();
      setIsPlayerOpen(true);
      gtag && gtag("event", "click_CTA", { game: game.title });
    }

    // deal with the back button
    function handleClickBack(e) {
      setIsPlayerOpen(false);
      _gameIframe.src = "";
    }

    // deal with the description
    function handleClickDesc(e) {
      _desc.classList.toggle("show-all");
    }

    _playBtn.addEventListener("click", handleClickPlay);
    _backBtn && _backBtn.addEventListener("click", handleClickBack);

    _desc.addEventListener("click", handleClickDesc);

    return () => {
      _playBtn.removeEventListener("click", handleClickPlay);
      _backBtn && _backBtn.removeEventListener("click", handleClickBack);

      _desc.removeEventListener("click", handleClickDesc);
    };
  }, [isPlayerOpen, game.title, gameUrl]);

  const iconUrl = getGameIcon(game.gid);

  return (
    <Layout>
      <Head>
        <title>{`Play ${game.title} on ${SITE_META.NAME}`}</title>
        <meta
          name="description"
          content={`Play ${game.title} on ${SITE_META.NAME}`}
        />
        <link
          rel="canonical"
          href={`https://www.playgamesfree.xyz/game/${game.slug}`}
        />
      </Head>
      <Microformat id={game.gid} item={game} type={`Game`} />
      <AdScript />
      <div className="detail">
        <section className="relative mx-8 flex flex-col xl:order-2 xl:col-span-6 xl:mx-0 xl:flex xl:grow xl:flex-col">
          <div className="relative order-2 mb-4 flex flex-col items-center xl:mb-0">
            <button
              className={`play-btn ${isPlayerOpen ? "hidden" : ""}`}
              title={`Play ` + game.title + ` Now`}
            >
              Play Now
            </button>

            <div className={`player`}>
              {isPlayerOpen ? (
                <>
                  <Draggable
                    nodeRef={draggableRef}
                    axis="y"
                    bounds="parent"
                    onStart={handleStart}
                    onDrag={handleDrag}
                    onStop={handleEnd}
                  >
                    <div ref={draggableRef} className="back-btn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="h-6 w-6 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                      </svg>
                    </div>
                  </Draggable>
                  <iframe
                    className="game-iframe"
                    src={getGameUrl(game.slug)}
                  ></iframe>
                </>
              ) : null}
              <Image
                className="player-bg absolute left-1/2 top-1/2 -z-0 w-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-70 blur-2xl"
                src={iconUrl}
                alt={game.title}
                width={200}
                height={200}
              />
            </div>
          </div>
          <div className="game-meta">
            <Image
              className="image"
              src={iconUrl}
              width={200}
              height={200}
              alt={game.title}
              loading={`eager`}
            />
            <div>
              <h1 className="title">{game.title}</h1>
              <div className="game-info">
                <div className="game-rating">
                  <span>{(game.rating * 5).toFixed(1)}</span>
                </div>
                <Link
                  href={`/category/${game.category.slug}`}
                  className="game-category"
                >
                  {game.category.name}
                </Link>
                {isFeatured(game.gid) ? (
                  <span className="hot-label">Hot</span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="description">
            <h3 className="mb-2 font-bold">Description</h3>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: game.description }}
            />
          </div>
          <div className="popular">
            <div className="section-head">
              <h2 className="h2">You may also like</h2>
            </div>
            <List items={relatedGames.slice(0, 12)} type={`banner`} />
          </div>
        </section>
        <aside className="xl:order-1 xl:col-span-3">
          <div className="mb-6">
            <AdSense />
          </div>
          <List
            items={relatedGames.slice(12, (PER_PAGE - 12) / 2 + 12)}
            type="banner"
          />
        </aside>
        <aside className="xl:order-3 xl:col-span-3">
          <div className="mb-6">
            <AdSense />
          </div>
          <List
            items={relatedGames.slice((PER_PAGE - 12) / 2 + 12)}
            type="banner"
          />
        </aside>
      </div>
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  const data = await getGameBySlug(ctx.params.slug, PER_PAGE);

  return {
    props: {
      game: data?.games[0],
      relatedGames: data?.related,
      // game: demoData.game,
      // relatedGames: demoData.relatedGames,
    },
  };
};

export const getStaticPaths = async () => {
  // 按分类取
  const categories = await getCategories();
  // console.log(`detai ..categories`, categories);
  let data = [];
  for (const item of categories) {
    // console.log(`slug`, item.slug);
    const tmp = await fetchAPI(
      `
        query ($category: String, $limit: Int ){
          games (filter: { category: { slug: { _eq: $category } } }, limit: $limit, sort: "-featured") {
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
