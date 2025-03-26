"use client";
import UserAvatar from "../auth/UserAvatar";
import { useSidebar } from "../ui/sidebar";

const SidebarTrigger = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <button onClick={toggleSidebar} className=" absolute bottom-4 left-4 ">
      <UserAvatar />
    </button>
  );
};

export default SidebarTrigger;
