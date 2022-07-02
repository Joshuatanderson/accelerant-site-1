import React from "react";

import logo from "../public/logo.png";
import Image from "next/image";
import { Box } from "@mui/material";

import Menu from "./Menu";
import Link from "next/link";

const classes = {
  headerCont: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  invisibleLink: {
    backgroundImage: "none",
  },
};

// const Header = () => {
//   return (
//     // <Box sx={classes.headerCont}>
//     //   <Link href="/">
//     //     <a style={classes.invisibleLink}>
//     //       <Image
//     //         layout="fixed"
//     //         width={104.3}
//     //         height={24.9}
//     //         src={logo}
//     //         alt="Accelerant"
//     //       />
//     //     </a>
//     //   </Link>
//     //   <Menu />
//     // </Box>
//   );
// };

const navigation = [
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Sandbox",
    href: "/sandbox",
  },
  {
    name: "Projects",
    href: "/case-studies",
  },
];
export default function Header() {
  return (
    <header className="bg-aDark">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-aWhite lg:border-none">
          <div className="flex items-center">
            <a href="/">
              <span className="sr-only">Workflow</span>
              <img className="h-5 w-auto" src="logo.png" alt="" />
            </a>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-white hover:text-indigo-50"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <a
              href="/login"
              className="inline-block bg-aPrimary py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
            >
              Sign in
            </a>
            <a
              href="/signup"
              className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-aPrimary hover:bg-indigo-50"
            >
              Sign up
            </a>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-white hover:text-indigo-50"
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
