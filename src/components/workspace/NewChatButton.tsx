"use client";
import { useRouter } from "next/navigation";
import { RiChatAiLine } from "react-icons/ri";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

const NewChatButton = () => {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      className=" w-full cursor-pointer"
      onClick={() => {
        router.push("/");
        toggleSidebar();
      }}
    >
      <RiChatAiLine />
      Start new chat
    </Button>
  );
};

export default NewChatButton;
