import { House, NotebookPen, UserRound } from "lucide-react";
import React from "react";

const CustomSidebar = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-yellow-300 p-2.5 py-3.5">
      <House className="w-8 h-8 mb-2 cursor-pointer" />
      <UserRound className="w-8 h-8 mb-2 cursor-pointer" />
      <NotebookPen className="w-8 h-8 mb-2 cursor-pointer" />
    </div>
  );
};

export default CustomSidebar;
