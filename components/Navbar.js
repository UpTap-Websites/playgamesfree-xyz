import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SITE_META } from "../lib/constants";
import Logo from "@/public/assets/brand/playgamesfree-logo.png";
import Image from "next/image";

export default function Navbar({ navItems }) {
  const [isOpen, setIsOpen] = useState(false); // 默认不展开导航菜单

  const router = useRouter();
  // const currentQuery = router.query;
  const currentPath = router.asPath;

  // console.log(`router: `, router);
  // console.log(`currentQuery: `, currentQuery);
  // console.log(`currentPath: `, currentPath);

  function handleClick() {
    setIsOpen(() => !isOpen);
    // console.log(`isOpen`, isOpen);
  }

  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item a"); // 导航链接集合
    let currentItem = document.querySelector(".current"); // 选取.current
    currentItem && currentItem.classList.remove("current"); // 如果存在.current则先移除

    for (let i of menuItems) {
      i.getAttribute("href") === currentPath
        ? (i.parentNode.classList += " current")
        : null;
      // console.log(`parent Ele: `, i.parentElement);
      // console.log(`parent Node: `, i.parentNode);
      // console.log(`a href: `, i.getAttribute("href"));
      // console.log(`b: `, i.parentNode.classList);
      // console.log(`currentQuery: `, currentQuery.slug);
    }
  }, [currentPath]);
  return (
    <header>
      <nav role={`navigation`} className="site-nav">
        <Link
          href={`/`}
          title={SITE_META.NAME}
          className="site-logo flex items-center gap-2 font-bold text-emerald-700 xl:absolute xl:left-8 xl:top-3 xl:-translate-x-0 xl:text-lg xl:text-yellow-300"
        >
          <Image
            src={Logo}
            className="h-8 w-8 xl:h-10 xl:w-10"
            alt={SITE_META.NAME}
            width={40}
            height={40}
          />
          <span>{SITE_META.NAME}</span>
        </Link>
        <button
          className="menu-button"
          onClick={handleClick}
          arial-label="menu"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        <div className={(isOpen ? "" : "hidden ") + "menu-panel"}>
          <ul role={`list`} className="menu-list">
            <li className="menu-item">
              <Link href={`/all`} title={`All`}>
                All
              </Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/adventure`} title={`Adventure`}>
                Adventure
              </Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/` + `arcade`} title={`Arcade`}>
                Arcade
              </Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/board`} title={`Board`}>
                Board
              </Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/junior`} title={`Junior`}>
                Junior
              </Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/puzzles`} title={`Puzzles`}>
                Puzzles
              </Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/classics`} title={`Classics`}>
                Classics
              </Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/sports`} title={`Sports`}>
                Sports
              </Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/strategy`} title={`Startegy`}>
                Strategy
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
