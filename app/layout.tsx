import "./globals.css";
import type { Metadata } from "next";
import { Poppins as PoppinsFont } from "next/font/google";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";
import { Toaster } from "react-hot-toast";
import CartProvider from "@/provider/CartProvider";

const Poppins = PoppinsFont({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Sambyal-Shop",
  description:
    "Premier online mobile shop in KANGRA, offering top-quality products and exceptional service.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${Poppins.className} text-slate-700`}>
        <Toaster
          toastOptions={{
            style: {
              background: "rgb(51 65 86)",
              color: "#fff",
            },
          }}
        />
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
