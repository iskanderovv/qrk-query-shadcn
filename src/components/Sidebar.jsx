import { AiOutlineCodeSandbox } from "react-icons/ai";
import { Link } from "react-router-dom";


const SidebarComponent = ({collapse}) => {
  return (
    <aside className={`text-[#020817] shadow-bxshadow h-screen ${collapse ? "w-[90px] transition" : "w-[300px]"} py-6 px-4`}>
      <Link to='/' className={`text-3xl block font-mono text-[#020817] text-center mb-7 ${collapse ? "text-xl" : ""} `}>Ai.Dev</Link>
      <ul>
          <div className="w-full bg-[#0f172a] p-3 rounded-md text-white flex justify-center cursor-pointer">
          <Link to="/dashboard" className="flex items-center gap-2">
          <AiOutlineCodeSandbox className="text-2xl" /> 
          <span className={`font-normal text-[18xp] ${collapse ? "hidden" : ""}`}>Products</span>
          </Link>
        </div>
      </ul>
    </aside>
  );
};

export default SidebarComponent;
