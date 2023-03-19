import Footer from "./Footer";
import Navbar from "./Navbar";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <div className={`wrapper ${nunito.className}`}>
      <Navbar />
      <main className="grow my-4">{children}</main>
      <Footer />
    </div>
  );
}
