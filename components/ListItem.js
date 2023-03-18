import getGameIcon from "@/utils/getGameIcon";
import Image from "next/image";
import Link from "next/link";

export default function ListItem({ item }) {
  return (
    <li className="list-item">
      <Link href={`/game/` + item.slug}>
        <Image
          className="image"
          src={getGameIcon(item.gid)}
          alt={item.title}
          width={100}
          height={100}
        />
        <div className="title">{item.title}</div>
        {/* <div className="category">{item.category.name}</div> */}
        {/* <div className="rating">{item.rating}</div> */}
      </Link>
    </li>
  );
}
