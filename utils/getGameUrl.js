import { SID } from "@/lib/constants";

export default function getGameUrl(slug) {
  return `https://play.gamepix.com/${slug}/embed?sid=${SID}`;
}
