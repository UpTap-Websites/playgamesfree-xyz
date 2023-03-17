import Image from "next/image";
import Link from "next/link";
import getGameIcon from "@/utils/getGameIcon";

export default function ListItem({ item }) {
  return (
    <li className="list-item">
      <Link href={`/game/` + item.slug}>
        <a>
          <Image
            className="image"
            src={getGameIcon(item.id)}
            alt={item.title}
            width={100}
            height={100}
          />
          <div className="title">{item.title}</div>
          {/* <div className="category">{item.category.name}</div> */}
          {/* <div className="rating">{item.rating}</div> */}
        </a>
      </Link>
    </li>
  );
}
