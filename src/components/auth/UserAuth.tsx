"use client";
import { useDialogStore } from "@/store/dialogStore";
import { Rocket } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import UserAvatar from "./UserAvatar";

const UserAuth = () => {
  const session = useSession();
  const { setOpen } = useDialogStore();

  return (
    <div className=" flex gap-2 p-1">
      {session?.data?.user ? (
        <UserAvatar />
      ) : (
        <>
          <Button
            variant={"secondary"}
            size={"sm"}
            className=" bg-background cursor-pointer border"
            onClick={() => setOpen(true)}
          >
            Signin
          </Button>
          <Button
            className=" cursor-pointer"
            size={"sm"}
            onClick={() => setOpen(true)}
          >
            <Rocket size={18} />
            Get started
          </Button>
        </>
      )}
    </div>
  );
};

export default UserAuth;
