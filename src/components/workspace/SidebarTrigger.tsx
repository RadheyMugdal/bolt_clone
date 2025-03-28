"use client";
import { PanelLeft } from "lucide-react";
import UserAvatar from "../auth/UserAvatar";
import { useSidebar } from "../ui/sidebar";

const SidebarTrigger = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      onMouseOver={toggleSidebar}
      onClick={toggleSidebar}
      className=" cursor-pointer absolute bottom-4 left-4  flex flex-col gap-3 items-center "
    >
      <UserAvatar />
      <PanelLeft size={14} />
    </button>
  );
};

export default SidebarTrigger;
