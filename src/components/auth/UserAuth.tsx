"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDialogStore } from "@/store/dialogStore";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import UserAvatar from "./UserAvatar";

const UserAuth = () => {
  const session = useSession();
  const router = useRouter();
  const { setOpen } = useDialogStore();
  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };
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

            <Button
              variant={"secondary"}
              className=" justify-start w-full hover:bg-accent cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Logout
            </Button>
          </PopoverContent>
        </Popover>
      ) : (
        <>
          <Button
            variant={"secondary"}
            size={"sm"}
            className=" bg-background cursor-pointer border  rounded-full"
            onClick={() => setOpen(true)}
          >
            Signin
          </Button>
        </>
      )}
    </div>
  );
};

export default UserAuth;
