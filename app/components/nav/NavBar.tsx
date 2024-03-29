import React, { Suspense } from "react";
import Container from "../Container";
import Link from "next/link";
import { Redressed } from "next/font/google";
import Image from "next/image";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Categories from "./Categories";
import SearchBar from "./SearchBar";
const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div
      className={`sticky top-0 w-full bg-slate-300 z-30 shadow-sm transition-transform duration-300 `}
    >
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-1 md-gap-0">
            <Link
              className={`${redressed.className} font-bold text-2xl`}
              href="/"
            >
              <div className="flex text-center justify-center items-center">
                <Image alt="logo" src="/logo2.png" height={10} width={50} />
                <span className="hidden md:block">Thakur Ekart</span>
              </div>
            </Link>
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
      <Suspense fallback={<>Loading...</>}>
        <Categories />
      </Suspense>
    </div>
  );
};

export default NavBar;
