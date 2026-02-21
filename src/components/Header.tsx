import { Notebook } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="flex w-full bg-red-400 justify-center p-3">
      <Notebook className="w-6 h-6 mr-2" />
    </div>
  );
};

export default Header;
