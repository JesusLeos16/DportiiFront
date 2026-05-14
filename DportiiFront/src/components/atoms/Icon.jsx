import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

export const IconMenu = ({ onClick }) => {
  return (
    <RxHamburgerMenu onClick={onClick} className="text-2xl text-blue-800" />
  );
};

// export const IconUser = ({onClick}) => {
//   return (
//     <FaUserCircle
//       onClick={onClick}
//       className="text-3xl text-gray-700" />
//   );
// };

export const IconLogout = ({ onClick }) => {
  return (
    <BiLogOut
      onClick={onClick}
      className="text-2xl text-gray-600 cursor-pointer hover:text-red-700 transition-colors "
    />
  );
};

import {
  FiAward,
  FiUsers,
  FiHome,
  FiCrosshair,
  FiShuffle,
  FiFolder,
} from "react-icons/fi";

export const IconTrophy = ({ className }) => <FiAward className={className} />;
export const IconFighter = ({ className }) => <FiUsers className={className} />;
export const IconAcademy = ({ className }) => <FiHome className={className} />;
export const IconSwords = ({ className }) => (
  <FiCrosshair className={className} />
);
export const IconMatchup = ({ className }) => (
  <FiShuffle className={className} />
);
export const IconFolder = ({ className }) => <FiFolder className={className} />;
