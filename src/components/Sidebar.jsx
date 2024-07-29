import { useState } from "react";
import { AiOutlineCodeSandbox, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const SidebarComponent = ({ collapse }) => {
  const [active, setActive] = useState("products");

  return (
    <aside
      className={`text-[#020817] shadow-bxshadow h-screen sticky left-0 top-0 py-6 px-3 
        transition-width duration-300 ease-in-out
        ${collapse ? "w-[90px]" : "w-[300px]"}
      `}
    >
      <Link
        to='/'
        className={`text-3xl block font-mono text-[#020817] text-center mb-7`}
      >
        {collapse ? "Ai" : "Ai.Dev"}
      </Link>
      <ul>
        <li>
          <Button
            className={`w-full p-2 py-4 rounded-md flex items-center gap-2 
              ${active === "products" ? "bg-[#0f172a] text-white" : "bg-white text-[#020817]"}
              transition-colors duration-300 ease-in-out
              hover:${active === "products" ? "bg-[#0f172a]" : "bg-gray-200"}
            `}
            onClick={() => setActive("products")}
          >
            <AiOutlineCodeSandbox className="text-2xl" />
            <span className={`font-normal text-[18px] ${collapse ? "hidden" : ""}`}>
              Products
            </span>
          </Button>
        </li>
        {/* <li>
          <Button
            className={`w-full p-3 rounded-md flex items-center gap-2 
              ${active === "users" ? "bg-[#0f172a] text-white" : "bg-white text-[#020817]"}
              transition-colors duration-300 ease-in-out
              hover:${active === "users" ? "bg-[#0f172a]" : "bg-gray-200"}
            `}
            onClick={() => setActive("users")}
          >
            <AiOutlineUser className="text-2xl" />
            <span className={`font-normal text-[18px] ${collapse ? "hidden" : ""}`}>
              Users
            </span>
          </Button>
        </li> */}
      </ul>
    </aside>
  );
};

export default SidebarComponent;
