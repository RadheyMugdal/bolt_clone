"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDialogStore } from "@/store/dialogStore";
import { LogOut, Rocket } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import UserAvatar from "./UserAvatar";

const UserAuth = () => {
  const session = useSession();
  const { setOpen } = useDialogStore();

  return (
    <div className=" flex gap-2 p-1">
      {session?.data?.user ? (
        <Popover>
          <PopoverTrigger>
            {" "}
            <UserAvatar />
          </PopoverTrigger>
          <PopoverContent className="  p-1 w-44 flex gap-2 flex-col rounded-sm ">
            <div className=" mt-2 flex gap-2 items-center  p-1 rounded-md cursor-pointer ">
              <UserAvatar />
              <div>
                <p className=" text-xs">{session?.data?.user?.name}</p>
                <p className=" text-xs opacity-70">Free plan</p>
              </div>
            </div>
            <Link href={"/"} className=" w-full">
              <Button
                variant={"secondary"}
                className=" justify-start w-full hover:bg-accent cursor-pointer"
              >
                <LogOut size={18} />
                Logout
              </Button>
            </Link>
          </PopoverContent>
        </Popover>
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
