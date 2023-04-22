"use client";
import React, { useState, Fragment } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import "./styles.css";
import { CardWithImage } from "components/ui/card";

const products = [
  {
    name: "Azules",
    href: "#",
    icon: EyeIcon,
    color: "text-blue-500",
  },
  {
    name: "Verdes",
    href: "#",
    icon: EyeIcon,
    color: "text-green-500",
  },
  {
    name: "Grises",
    href: "#",
    icon: EyeIcon,
    color: "text-slate-500",
  },
  {
    name: "Celestes",
    href: "#",
    icon: EyeIcon,
    color: "text-cyan-300",
  },
  {
    name: "Marrones",
    href: "#",
    icon: EyeIcon,
    color: "text-amber-800",
  },
  {
    name: "Miel",
    href: "#",
    icon: EyeIcon,
    color: "text-amber-600",
  },
  {
    name: "Media Luna",
    href: "#",
    icon: EyeIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropDownDetails, setOpenDropDownDetails] =
    useState<boolean>(false);

  const handleMouseEnter = () => {
    setOpenDropDownDetails(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setOpenDropDownDetails(false);
    }, 850);
  };

  return (
    <header className="header--color sticky top-0 z-50">
      <nav
        className="mx-auto flex items-center justify-between lg:px-8 max-w-screen-2xl py-2"
        aria-label="Global"
      >
        <div className="flex justify-start items-center">
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12 items-center">
            <div className="flex lg:flex-1">
              <a href="#" className="">
                <img className="h-32 w-32 hover:opacity-70" src="/img/logo.jpeg" alt="" />
              </a>
            </div>
            <a
              onMouseEnter={handleMouseLeave}
              href="#"
              className="text-2xl leading-6 text-[#364152] hover:opacity-80 link link-underline link-underline-black font-lalia-bold"
            >
              Natural Lens
            </a>

            <div className="grid grid-cols-1 divide-y">
              <a
                onMouseEnter={handleMouseEnter}
                href="#"
                className="flex items-center text-2xl font-lalia-bold leading-6 text-[#364152] hover:opacity-80 link link-underline link-underline-black"
              >
                Tonalidades
                {!openDropDownDetails ? (
                  <ChevronDownIcon
                    className="h-5 w-5 ml-1.5 flex-none text-[#364152] group-hover:hover:opacity-80 font-bold"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronUpIcon
                    className="h-5 w-5 ml-1.5 flex-none text-[#364152] group-hover:hover:opacity-80 font-bold"
                    aria-hidden="true"
                  />
                )}
              </a>

              {openDropDownDetails && (
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="header--color flex w-full left-0 top-[9rem] flex-col drop-shadow-lg z-50 absolute"
                >
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <div className="text-[40px] mt-6 mb-2 ml-16 text-[#364152] animate-fade-in-y font-flamenco-regular">
                        <span className="link link-underline link-underline-yellow uppercase hover:text-[#BC8129]">
                          Tonalidades
                        </span>
                      </div>
                      {products.map((item) => (
                        <div
                          key={item.name}
                          className="ml-16 h-5/6 group relative flex justify-center items-center gap-x-2 p-4 leading-6 cursor-pointer last:mb-8"
                        >
                          <div className="flex-auto text-justify">
                            <a
                              href={item.href}
                              className="block font-semibold text-[#364152] Header__details text-justify animate-fade-in-y font-flamenco-ligth"
                            >
                              {item.name}
                              <span className="absolute inset-0" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-row mr-20 py-9 space-x-4">
                      <CardWithImage image="lenses-1.webp" title="Grises" />
                      <CardWithImage image="lenses-2.jpeg" title="Media Luna" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Popover.Group>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="h-7 w-7 cursor-pointer text-[#364152] mr-8 hover:opacity-80">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              ></path>
            </svg>
          </div>

          <div className="h-7 w-7 cursor-pointer text-[#364152] hover:opacity-80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
        </div>
      </nav>

      {/* Mobile */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50">
                        Product
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
