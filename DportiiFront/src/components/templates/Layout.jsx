import React from "react";
import { Navbar } from "../organisms/Navbar";
import { BottomNav } from "../organisms/BottomNav";

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16 md:pb-0 relative">
      <Navbar />
      <main className="w-full">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};
