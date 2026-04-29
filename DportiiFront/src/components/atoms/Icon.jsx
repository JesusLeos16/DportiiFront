import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
export const IconMenu = ({onClick}) => {
  return (
    <RxHamburgerMenu 
    onClick={onClick}
    className="text-2xl text-blue-800" />
  );
};

export const IconUser = ({onClick}) => {
  return (
    <FaUserCircle 
      onClick={onClick}
      className="text-3xl text-gray-700" />
  );
};
