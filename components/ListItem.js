import getGameBanner from "@/utils/getGameBanner";
import getGameIcon from "@/utils/getGameIcon";
import Image from "next/image";
import Link from "next/link";
import { FEATURED_GAMES } from "@/lib/constants";

// import Icon from "@/public/demo/icon.png";
// import Banner from "@/public/demo/banner.png";

export default function ListItem({ item, type }) {
  const isFeatured = FEATURED_GAMES.includes(item.gid);
  return (
    <li className="list-item">
      <Link href={`/game/${item.slug}`} title={item.title}>
        <div className={isFeatured ? `hot` : ``}>
          <Image
            className="image"
            src={
              type !== `banner`
                ? getGameIcon(item.gid)
                : getGameBanner(item.gid)
            }
            // src={type !== `banner` ? Icon : Banner}
            alt={item.title}
            width={type !== `banner` ? 100 : 132}
            height={type !== `banner` ? 100 : 81}
          />
        </div>
        <div className="title">
          <b>{item.title}</b>
        </div>
        {/* <div className="category">{item.category.name}</div> */}
        {/* <div className="rating">{item.rating}</div> */}
      </Link>
    </li>
  );
}
