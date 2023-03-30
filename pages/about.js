import Head from "next/head";
import Layout from "@/components/Layout";
import { SITE_META } from "@/lib/constants";

export default function About() {
  const content = `
    <p>
      Welcome to our ultimate online gaming platform - your go-to destination for a wide
      variety of free online games. At PlayGamesFree.xyz, we offer everything from thrilling
      action games to brain-teasing puzzles and exciting sports games.
    </p>
    <p>
      Our user-friendly interface makes it easy to browse and find games that suit your
      interests, and you can play them all directly in your browser - no downloads
      necessary!
    </p>
    <p>
      We take pride in offering high-quality games that are sure to keep you entertained for
      hours on end. With our free, fun games, you can enjoy gaming anytime, anywhere.
    </p>
    <p>
      So, whether you're looking for a quick gaming fix during your lunch break or a full
      day of non-stop entertainment, PlayGamesFree.xyz has got you covered. Come join the
      fun and start playing today!
    </p>
  `;
  return (
    <Layout>
      <Head>
        <title>{`About` + ` | ` + SITE_META.NAME}</title>
        <link rel="canonical" href="https://www.playgamesfree.xyz/about" />
      </Head>
      <div className={`page xl:mx-auto`}>
        <section>
          <div className="section-head">
            <h2 className="h2">About</h2>
          </div>
          <div
            className="mx-8 p-4 rounded-md text-yellow-900 mb-4 bg-amber-200"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
      </div>
    </Layout>
  );
}
