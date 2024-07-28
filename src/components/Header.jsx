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
    <header className=" text-[#020817] py-6 px-5 w-full flex justify-between items-center shadow-bxshadow">
      <div className="text-2xl cursor-pointer">
        {collapse ? <BsLayoutSidebarReverse onClick={() => toggleCollapse()} /> : <BsLayoutSidebar onClick={() => toggleCollapse()} />}
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
};

export default Header;
