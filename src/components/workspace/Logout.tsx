"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };
  return (
    <Button className=" w-full" variant={"secondary"} onClick={handleLogout}>
      <LogOut />
      Logout
    </Button>
  );
};

export default Logout;
