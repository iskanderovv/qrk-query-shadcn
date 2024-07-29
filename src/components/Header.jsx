import { BsLayoutSidebar } from "react-icons/bs";
import { BsLayoutSidebarReverse } from "react-icons/bs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


const Header = ({collapse, setCollapse}) => {

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <header className=" text-[#020817] h-20 px-5 w-full sticky top-0 z-10 bg-white flex justify-between items-center shadow-bxshadow">
      <div className="text-2xl cursor-pointer relative">
        <div className="absolute bg-white cursor-default h-20 w-10 -top-7 -left-12"></div>
        {collapse ? <BsLayoutSidebarReverse onClick={() => toggleCollapse()} /> : <BsLayoutSidebar onClick={() => toggleCollapse()} />}
      </div>
      <Avatar className="cursor-pointer">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
};

export default Header;
