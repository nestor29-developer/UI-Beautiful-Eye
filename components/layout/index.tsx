"use client";
import { useCalculateForwardedFree, useProductsBuyCarSidebar, useQuickAddition } from "@/lib/store";
import { Footer } from "components/footer";
import { ProductList } from "components/product/product-list";
import { Button } from "components/ui/button";
import { CardCarousel } from "components/ui/card-carousel";
import { Navbar } from "components/ui/navbar";
import { SideBar } from "components/ui/side-bar";
import { Slide } from "components/ui/slide";
import { AnimatePresence, motion } from "framer-motion";

import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Header } from "../header/index";

export const Layout = () => {
  const [isOpenBarDiscount, setIsOpenBarDiscount] = useState<boolean>(true);
  const [openSideBar, setOpenSideBar] = useState(false);
  const quickAddition = useQuickAddition((state: any) => state.quickAddition);
  const setProduts = useProductsBuyCarSidebar(
    (state: any) => state.setProductsBuyCarSidebar
  );
  const setCalculateForwardedFree = useCalculateForwardedFree(
    (state: any) => state.setCalculateForwardedFree
  );
  const [cookies, setCookie, removeCookie] = useCookies([
    "productsPurchaseCar",
  ]);

  const productList = [
    {
      title: "sunrise",
      stars: 5,
      oldPrice: 25000,
      currentPrice: 17000,
      info: "Ahorra 32%",
      imageName: "caffe-eye.jpeg",
    },
    {
      title: "russian blue",
      stars: 4,
      oldPrice: 25000,
      currentPrice: 17000,
      info: "Ahorra 32%",
      imageName: "light-blue-eye.jpeg",
    },
    {
      title: "queen green",
      stars: 4,
      oldPrice: 25000,
      currentPrice: 17000,
      info: "Ahorra 32%",
      imageName: "white-green-eye.jpeg",
    },
    {
      title: "butter",
      stars: 5,
      oldPrice: 25000,
      currentPrice: 17000,
      info: "Ahorra 32%",
      imageName: "light-green-eye.jpeg",
    },
  ];

  const BrowseAllProducts = () => {
    return (
      <div className="flex w-full justify-between">
        <h2 className="text-[44px] font-lalia-bold">Nuevos productos</h2>
        <a
          href="#"
          className="text-[#5f2698] flex items-center align-middle mr-4 mt-12"
        >
          <span className="text-base font-montserrat-regular link link-underline link-underline-purple">
            Ver todo
          </span>
          <motion.div
            animate={{ x: 6 }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <span aria-hidden="true" className="ml-1 mb-1 text-2xl">
              {" "}
              →
            </span>
          </motion.div>
        </a>
      </div>
    );
  };

  const list = [
    {
      icon: "forward.svg",
      title: "ENVÍO GRATIS",
      description: "A todo Chile en compras mayor a $35.000",
    },
    {
      icon: "headphones.svg",
      title: "SERVICIO AL CLIENTE",
      description:
        "<a href=''><u>Contáctanos</u></a> y te ayudaremos en lo que </br> necesites.",
    },
    {
      icon: "padlock.svg",
      title: "PAGO SEGURO",
      description:
        "Todas las transacciones son a través de </br> <u>Mercado Pago</u>.",
    },
  ];

  useMemo(() => {
    if (quickAddition) {
      setOpenSideBar(true);
    }
  }, [quickAddition]);

  useEffect(() => {
    const products = cookies?.productsPurchaseCar;
    if (products) {
      setProduts(products);
      setCalculateForwardedFree(true)
    }
  }, []);

  return (
    <React.Fragment>
      {openSideBar && (
        <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
      )}

      {isOpenBarDiscount && (
        <Navbar setIsOpenBarDiscount={setIsOpenBarDiscount} />
      )}
      <Header openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
      <div className="w-screen">
        <Slide />
      </div>

      <div className="mx-16 flex flex-col items-center mt-8">
        <div className="w-full -mt-[140px] pb-[72px] z-40 ml-4">
          <Button
            type="group-primary"
            className=" w-[148px] h-[60px] flex justify-center items-center font-montserrat-regular"
            description="Comprar"
            textClassName="text-base"
            animated={true}
          />
        </div>
        <BrowseAllProducts />
        <ProductList productList={productList} />
      </div>

      <div className="font-montserrat-regular mt-80 mb-24 w-full">
        <CardCarousel listItems={list} />
      </div>

      <div className="font-montserrat-regular">
        <Footer />
      </div>
    </React.Fragment>
  );
};
