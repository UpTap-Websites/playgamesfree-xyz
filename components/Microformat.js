import Script from "next/script";
import getGameIcon from "@/utils/getGameIcon";
import getGameUrl from "@/utils/getGameUrl";
import { SITE_META } from "@/lib/constants";

export default function Microformat({ id, item, type = "Game" }) {
  // type: site, game, breadcrumb
  // generate microformats in ld-json for SEO
  let schemaData = {};
  if (type == "WebSite") {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      url: SITE_META.URL,
      logo: `${SITE_META.URL}/assets/brand/playgamesfree-logo.png`,
    };
  } else if (type == "Game") {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      image: `${getGameIcon(item.gid)}`,
      // aggregateRating: {
      //   "@type": "AggregateRating",
      //   ratingValue: `${(item.rating * 5).toFixed(1)}`,
      // },
      applicationCategory: "VideoGame",
      applicationSubCategory: `${item.category.name} Game`,
      genre: `${item.category.name}`,
      name: `${item.title}`,
      description: `${item.description}`,
      url: `${getGameUrl(item.slug)}`,
      offers: {
        "@type": "Offer",
        availability: "http://schema.org/InStock",
        price: "0",
        Category: "free",
        priceCurrency: "USD",
      },
      operatingSystem: "any",
    };
  }
  console.log(schemaData, "schemaData");
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  );
}
