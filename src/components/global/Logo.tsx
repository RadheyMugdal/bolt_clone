import { cn } from "@/lib/utils";
import Link from "next/link";
import { HiLightningBolt } from "react-icons/hi";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href={"/"} className={cn(" cursor-pointer", className)}>
      <h1 className=" text-xl font-bold flex  items-center gap-2">
        <HiLightningBolt />
        Bolt
      </h1>
    </Link>
  );
};

export default Logo;
