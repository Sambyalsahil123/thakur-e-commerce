import "./globals.css";
import type { Metadata } from "next";
import { Poppins as PoppinsFont } from "next/font/google";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";

const Poppins = PoppinsFont({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Sambyal-Shop",
  description:
    "Premier online mobile shop in KNAGRA, offering top-quality products and exceptional service.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${Poppins.className} text-slate-700`}>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
