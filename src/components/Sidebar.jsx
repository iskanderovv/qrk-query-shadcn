import { useState } from "react";
import { AiOutlineCodeSandbox, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const SidebarComponent = ({ collapse }) => {
  const [active, setActive] = useState("products");

  return (
    <aside className={`text-[#020817] shadow-bxshadow h-screen ${collapse ? "w-[90px] transition" : "w-[300px]"} py-6 px-4`}>
      <Link
        to='/'
        className={`text-3xl block font-mono text-[#020817] text-center mb-7 ${collapse ? "text-xl" : ""}`}
      >
        Ai.Dev
      </Link>
      <ul>
        <li>
          <Button
            className={`w-full p-3 rounded-md flex items-center gap-2 ${
              active === "products" ? "bg-[#0f172a] text-white" : "bg-white text-[#020817]"
            } transition-colors hover:${active === "products" ? "bg-[#0f172a]" : "bg-gray-200"}`}
            onClick={() => setActive("products")}
          >
            <AiOutlineCodeSandbox className="text-2xl" />
            <span className={`font-normal text-[18px] ${collapse ? "hidden" : ""}`}>Products</span>
          </Button>
        </li>
        {/* <li>
          <Button
            className={`w-full p-3 rounded-md flex items-center gap-2 ${
              active === "users" ? "bg-[#0f172a] text-white" : "bg-white text-[#020817]"
            } transition-colors hover:${active === "users" ? "bg-[#0f172a]" : "bg-gray-200"}`}
            onClick={() => setActive("users")}
          >
            <AiOutlineUser className="text-2xl" />
            <span className={`font-normal text-[18px] ${collapse ? "hidden" : ""}`}>Users</span>
          </Button>
        </li> */}
      </ul>
    </aside>
  );
};

export default SidebarComponent;
