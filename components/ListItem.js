import getGameBanner from "@/utils/getGameBanner";
import getGameIcon from "@/utils/getGameIcon";
import Image from "next/image";
import Link from "next/link";

// import Icon from "@/public/demo/icon.png";
// import Banner from "@/public/demo/banner.png";

export default function ListItem({ item, type }) {
  return (
    <li className="list-item">
      <Link href={`/game/${item.slug}`} title={item.title}>
        <Image
          className="image"
          src={type !== `banner` ? getGameIcon(item.gid) : getGameBanner(item.gid)}
          // src={type !== `banner` ? Icon : Banner}
          alt={item.title}
          width={type !== `banner` ? 100 : 132}
          height={type !== `banner` ? 100 : 81}
        />
        <div className="title">{item.title}</div>
        {/* <div className="category">{item.category.name}</div> */}
        {/* <div className="rating">{item.rating}</div> */}
      </Link>
    </li>
  );
}
