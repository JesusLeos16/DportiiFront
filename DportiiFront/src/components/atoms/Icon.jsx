import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

export const IconMenu = ({onClick}) => {
  return (
    <RxHamburgerMenu 
    onClick={onClick}
    className="text-2xl text-blue-800" />
  );
};

// export const IconUser = ({onClick}) => {
//   return (
//     <FaUserCircle 
//       onClick={onClick}
//       className="text-3xl text-gray-700" />
//   );
// };

export const IconLogout = ({onClick}) => {
  return (
    <BiLogOut 
      onClick={onClick}
      className="text-2xl text-red-600 cursor-pointer hover:text-red-700 transition-colors" />
  );
};
