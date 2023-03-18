import { useEffect } from "react";
import { ADSENSE_ID, DEV_MODE, SHOW_AD } from "@/lib/constants";

export default function AdSense({
  style,
  className,
  slot,
  format,
  responsive,
  layout,
  layoutKey,
}) {
  useEffect(() => {
    if (SHOW_AD)
      try {
        let adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
      } catch (e) {
        console.error(e.message);
      }
  }, []);
  if (SHOW_AD)
    return (
      <div className={`banner ${className || ""}`}>
        <div className="text-center text-xs uppercase">Advertisement</div>
        <ins
          className="adsbygoogle bg-gray-100"
          style={
            style || {
              display: `block`,
              margin: `0 auto`,
              // display: `flex`,
              // justifyContent: `center`,
              // width: `100%`,
              // height: `100%`,
            }
          }
          data-ad-client={ADSENSE_ID}
          data-ad-slot={slot}
          data-ad-format={format || "auto"}
          data-full-width-responsive={responsive || "true"}
          data-ad-layout={layout}
          data-ad-layout-key={layoutKey}
          {...(DEV_MODE || process.env.NODE_ENV === "development"
            ? { "data-adtest": "on" }
            : {})}
        ></ins>
      </div>
    );
}
