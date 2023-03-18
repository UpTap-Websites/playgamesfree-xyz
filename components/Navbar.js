import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SITE_META } from "../lib/constants";

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
      i.getAttribute("href") === currentPath ? (i.parentNode.classList += " current") : null;
      // console.log(`parent Ele: `, i.parentElement);
      // console.log(`parent Node: `, i.parentNode);
      // console.log(`a href: `, i.getAttribute("href"));
      // console.log(`b: `, i.parentNode.classList);
      // console.log(`currentQuery: `, currentQuery.slug);
    }
  }, [currentPath]);
  return (
    <header>
      <nav className="site-nav">
        <Link href={`/`} title={SITE_META.NAME} className="home-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
          </svg>
          <span className="sr-only">{SITE_META.NAME}</span>
        </Link>
        <button className="menu-button" onClick={handleClick}>
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
              className="w-6 h-6"
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
          <ul className="menu-list">
            <li className="menu-item">
              <Link href={`/all`}>All</Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/adventure`}>Adventure</Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/` + `arcade`}>Arcade</Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/board`}>Board</Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/junior`}>Junior</Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/puzzles`}>Puzzles</Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/classics`}>Classics</Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/sports`}>Sports</Link>
            </li>
            <li className="menu-item">
              <Link href={`/category/strategy`}>Strategy</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
