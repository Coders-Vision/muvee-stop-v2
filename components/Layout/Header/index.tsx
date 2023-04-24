import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import Search from "./Search";
import { useRouter } from "next/router";

type Props = {
  styleClass?: string;
};

function Header({ styleClass = "absolute top-0" }: Props) {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  return (
    <header className={`${styleClass} z-[1000] w-screen md:w-[90vw] `}>
      <nav className="mt-4 px-5 h-[65px] md:px-12 bg-transparent text-[#ffff]">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row ">
              <Image
                src="/logo/Logo.svg"
                width={140}
                height={50}
                alt={"logo"}
                className="cursor-pointer"
                onClick={() => router.push("/")}
              />
            </div>
            <div className="hidden ml-10 md:flex items:center space-x-6">
              <Link href="/" className="header-link group cursor-pointer">
                <span className="span">Home</span>
              </Link>
              <Link href="/movies" className="header-link group cursor-pointer">
                <span className="span">Movies</span>
              </Link>
              <Link href="/series" className="header-link group cursor-pointer">
                <span className="span">TV-Series</span>
              </Link>
            </div>
            <aside
              className={`transform top-0 left-0 w-64 bg-black fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${
                showDrawer ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <span className="flex w-full items-center justify-between p-4 border-b">
                <Image
                  src="/logo/Logo.svg"
                  width={100}
                  height={20}
                  alt={"logo"}
                  className="cursor-pointer"
                  onClick={() => router.push("/")}
                />
                <ImCross
                  className="mr-1 cursor-pointer"
                  onClick={() => setShowDrawer((pre) => !pre)}
                />
              </span>
              {/* <span className="flex items-center p-4 hover:bg-indigo-500 hover:text-white ">
                Genre
              </span> */}
              <span
                className="flex items-center p-4 hover:bg-green-500 hover:text-white "
                onClick={() => router.push("/movies")}
              >
                Movies
              </span>
              <span
                className="flex items-center p-4 hover:bg-red-500 hover:text-white "
                onClick={() => router.push("/series")}
              >
                TV Series
              </span>
            </aside>

            <div className="flex space-x-6">
              <FaSearch
                size={20}
                className="md:hidden cursor-pointer mt-2"
                onClick={() => setShow((pre) => !pre)}
              />
              <TiThMenu
                size={32}
                className="  md:hidden cursor-pointer"
                onClick={() => setShowDrawer((pre) => !pre)}
              />
            </div>
          </div>
          <Search showSearch={show} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
