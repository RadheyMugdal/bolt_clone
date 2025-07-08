"use client";
import { SidebarCloseIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

const SidebarCloseButton = () => {
  const { setOpen } = useSidebar();
  return (
    <Button variant={"secondary"} onClick={() => setOpen(false)} size={"sm"}>
      <SidebarCloseIcon />
    </Button>
  );
};

export default SidebarCloseButton;
