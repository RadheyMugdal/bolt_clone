import { auth } from "@/auth";
import { Rocket } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserAuth = async () => {
  const session = await auth();

  return (
    <div className=" flex gap-2 p-1">
      {session?.user ? (
        <Avatar>
          <AvatarImage src={session.user.image as string} />
          <AvatarFallback>
            {session.user.name
              ?.split(" ")
              .map((name) => name.charAt(0) as string)
              .join("")}
          </AvatarFallback>
        </Avatar>
      ) : (
        <button className=" bg-blue-500 p-2 rounded-lg px-4 flex  gap-2 items-center ">
          <Rocket size={18} />
          Get started
        </button>
      )}
    </div>
  );
};

export default UserAuth;
