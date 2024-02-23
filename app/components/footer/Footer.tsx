import React from "react";
import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import { FaSnapchat } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200  text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop Categories </h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktop</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Service </h3>
            <Link href="#">Contact US</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns & Exchange</Link>
            <Link href="#">FAQ</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">About Us</h3>
            <p className="mb-2">
              Discover the essence of tradition and modernity at Thakur eShop.
              Our mission is to bring you a unique collection that celebrates
              the art of creativity and craftsmanship. From local artisans to
              global brands, we ensure every piece tells a story worth sharing.
            </p>
            <p>
              &copy; {new Date().getFullYear()} Thakur eShop. All rights
              reserved. Explore a world of exceptional treasures with us today.
            </p>
          </div>

          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
            <div className="flex gap-2">
              <Link href="https://www.facebook.com/sahil.sambyal.rajput">
                <MdFacebook size={24} />
              </Link>
              <Link href="https://www.snapchat.com/add/sahil_sambyalg">
                <FaSnapchat size={24} />
              </Link>
              <Link href="https://www.instagram.com/sambyal_sahil_/">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="https://www.linkedin.com/in/sahil-sambyal-3210go/">
                <CiLinkedin size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
