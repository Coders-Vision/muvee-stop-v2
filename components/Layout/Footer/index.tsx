import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

function Footer() {
  const router = useRouter();
  return (
    <footer className="bg-gray-900 ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center mb-4 sm:mb-0">
            <Image
              src="/logo/Logo.svg"
              width={100}
              height={13}
              alt={"logo"}
              className="cursor-pointer"
              onClick={() => router.push("/")}
            />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="#" className="mr-4 hover:underline md:mr-6 ">
                Home
              </Link>
            </li>
            <li>
              <Link href="/movies" className="mr-4 hover:underline md:mr-6">
                Movies
              </Link>
            </li>
            <li>
              <Link href="/series" className="mr-4 hover:underline md:mr-6 ">
                Series
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
          © {`${new Date().getFullYear()} `}
          <Link href="/" className="hover:underline">
            Muvee Stop
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer
