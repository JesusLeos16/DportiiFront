import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IconMenu, IconUser } from "../atoms/Icon";
import { Link } from "react-router-dom";
import { Logo } from "../atoms/Logo";
import { NavGroup } from "../molecules/NavGroup";
export const Navbar = () => {
  return (
    <>
      <div className=" flex justify-between items-center px-5 py-2 w-full">
        <IconMenu />
        <Logo />
        <IconUser />
      </div>
      <div>
        <NavGroup/>
      </div>
    </>
  );
};
