import ListItem from "./ListItem";

export default function List({ items, className }) {
  return (
    <ul className={className ? `list ` + className : `list`}>
      {items.map((i) => (
        <ListItem key={i.slug} item={i} />
      ))}
    </ul>
  );
}
