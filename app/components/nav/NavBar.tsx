"use client";
import React, { useEffect, useState } from "react";
import Container from "../Container";
import Link from "next/link";
import { Redressed } from "next/font/google";
import Image from "next/image";
import CartCount from "./CartCount";
const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const NavBar = () => {
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`sticky top-0 w-full bg-slate-200 z-30 shadow-sm transition-transform duration-300 ${show}`}
    >
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md-gap-0">
            <Link
              className={`${redressed.className} font-bold text-2xl`}
              href="/"
            >
              <div className="flex text-center justify-center items-center">
                <Image alt="logo" src="/logo2.png" height={10} width={50} />
                Thakur E-Kart
              </div>
            </Link>
            <div className="hidden md:block">Search</div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <div>usermenu</div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
