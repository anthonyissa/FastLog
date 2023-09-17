import Logo from "../logo";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Top area: Blocks */}
          <div className="mb-8 grid gap-8 md:mb-12 md:grid-cols-12 lg:gap-20">
            {/* 1st block */}
            <div className="md:col-span-4 lg:col-span-5">
              <div className="mb-2">
                {/* Logo */}
                <Link href="/" className="inline-block" aria-label="Cruip">
                  <span className="inline-block font-bold">
                    <Logo />
                  </span>
                </Link>
              </div>
              <div className="text-gray-400">
                Monitoring is hard but crucial. <br />
                Fastlog is the easiest way to to so.
              </div>
            </div>

            {/* 2nd, 3rd and 4th blocks */}
            <div className="grid gap-8 sm:grid-cols-3 md:col-span-8 lg:col-span-7">
              <div className="text-sm"></div>

              {/* 4th block */}
              <div className="text-sm">
                <h6 className="mb-1 font-medium dark:text-gray-200 text-gray-600">
                  Socials
                </h6>
                <ul>
                  <li className="mb-1">
                    <Link
                      href={siteConfig.links.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-100"
                    >
                      Twitter
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href={siteConfig.links.discord}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-100"
                    >
                      Discord
                    </Link>
                  </li>
                </ul>
              </div>
              {/* 3rd block */}
              <div className="text-sm">
                <h6 className="mb-1 font-medium dark:text-gray-200 text-gray-600">
                  Links
                </h6>
                <ul>
                  <li className="mb-1">
                    <Link
                      href="/apps"
                      className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-100"
                    >
                      Applications
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/settings"
                      className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-100"
                    >
                      Settings
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href={siteConfig.links.docs}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-100"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/auth"
                      className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-100"
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom area */}
          <div className="md:flex md:items-center md:justify-between">
            {/* Social links */}
            <ul className="mb-4 flex md:order-1 md:mb-0 md:ml-4 gap-2">
              <li>
                <Link
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center rounded-full dark:bg-gray-800 text-purple-600 transition duration-150 ease-in-out hover:bg-purple-600 hover:text-gray-100"
                  aria-label="Twitter"
                >
                  <svg
                    className="h-8 w-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.links.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center rounded-full dark:bg-gray-800 text-purple-600 transition duration-150 ease-in-out hover:bg-purple-600 hover:text-gray-100"
                  aria-label="Twitter"
                >
                  <svg
                    className="h-8 w-8 fill-current p-2"
                    viewBox="0 -28.5 256 256"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                  >
                    <g>
                      <path
                        d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                        fill-rule="nonzero"
                      ></path>
                    </g>
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.links.docs}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center rounded-full dark:bg-gray-800 text-purple-600 transition duration-150 ease-in-out hover:bg-purple-600 hover:text-gray-100"
                  aria-label="Twitter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-8 w-8 fill-current p-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                    />
                  </svg>
                </Link>
              </li>
            </ul>

            {/* Copyrights note */}
            <div className="mr-4 text-sm text-gray-400">
              &copy; fastlog.app - All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
