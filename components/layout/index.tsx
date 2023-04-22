"use client";
import { Footer } from "components/footer";
import { Navbar } from "components/ui/navbar";
import { Slide } from "components/ui/slide";

import React from "react";
import { useState } from "react";
import { Header } from "../header/index";

export const Layout = () => {
  const [isOpenBarDiscount, setIsOpenBarDiscount] = useState<boolean>(true);

  return (
    <React.Fragment>
      {isOpenBarDiscount && (
        <Navbar setIsOpenBarDiscount={setIsOpenBarDiscount} />
      )}
      <Header />
      <div className="w-screen">
        <Slide />
      </div>

      <div className="py-80"></div>

      <div className="font-montserrat-regular">
        <Footer />
      </div>
    </React.Fragment>
  );
};
