"use client";
import { motion } from "motion/react";
import UserAuth from "../auth/UserAuth";
import { SidebarTrigger } from "../ui/sidebar";
import Logo from "./Logo";
const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: "-100%" }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          ease: "easeInOut",
        },
      }}
      className=" flex justify-between items-center h-14 py-4  px-10 backdrop:blur-lg bg-background/30  border-border/30 border-b sticky top-0 left-0 right-0  "
    >
      <SidebarTrigger className=" fixed left-2 top-3" />
      <Logo className=" ml-4" />

      <div className=" flex  gap-4 items-center">
        <UserAuth />
      </div>
    </motion.header>
  );
};

export default Header;
