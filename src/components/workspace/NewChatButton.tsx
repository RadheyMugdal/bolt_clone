"use client";
import { useRouter } from "next/navigation";
import { RiChatAiLine } from "react-icons/ri";
import { Button } from "../ui/button";

const NewChatButton = () => {
  const router = useRouter();
  return (
    <Button className=" w-full cursor-pointer" onClick={() => router.push("/")}>
      <RiChatAiLine />
      Start new chat
    </Button>
  );
};

export default NewChatButton;
