import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
export const IconMenu = () => {
  return (
    <RxHamburgerMenu className="text-2xl text-blue-800" />
  );
};

export const IconUser = () => {
  return (
    <FaUserCircle className="text-2xl text-gray-700" />
  );
};
