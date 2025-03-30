"use client";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserAvatar = () => {
  const { data: session } = useSession();

  return (
    <Avatar>
      <AvatarImage src={session?.user?.image as string} />
      <AvatarFallback>
        {session?.user?.name
          ?.split(" ")
          .map((name) => name.charAt(0) as string)
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
