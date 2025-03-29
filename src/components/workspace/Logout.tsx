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
    <Button
      className=" w-full cursor-pointer flex items-center gap-3 bg-sidebar-accent hover:bg-sidebar-accent/80"
      onClick={handleLogout}
    >
      <LogOut />
      Logout
    </Button>
  );
};

export default Logout;
