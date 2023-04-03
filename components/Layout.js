import Footer from "./Footer";
import Navbar from "./Navbar";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <div className={`wrapper ${montserrat.className}`}>
      <Navbar />
      <main className="my-4 grow">{children}</main>
      <Footer />
    </div>
  );
}
