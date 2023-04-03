import Image from "next/image";
import Link from "next/link";
import { SITE_META } from "@/lib/constants";
import Logo from "@/public/assets/brand/playgamesfree-logo.png";
// import { useRouter } from "next/router";
export default function Footer(params) {
  return (
    <footer className="site-footer">
      <nav className="footer-nav">
        <ul>
          <li>
            <Link href={`/about`}>About</Link>
          </li>
          <li>
            <Link href={`/privacy`}>Privacy Policy</Link>
          </li>
          <li>
            <Link href={`/terms`}>Terms of Use</Link>
          </li>
        </ul>
      </nav>
      {/* <Image className="footer-logo" src={Logo} alt={SITE_META.NAME} /> */}
      <Image
        className="footer-logo w-auto"
        src={Logo}
        width={64}
        height={64}
        alt={SITE_META.NAME}
      />
      <p>{`© ${new Date().getFullYear()} ${SITE_META.NAME}`}</p>
    </footer>
  );
}
