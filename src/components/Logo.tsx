import Link from "next/link";
import { HiLightningBolt } from "react-icons/hi";

const Logo = () => {
  return (
    <Link href={"/"} className=" cursor-pointer">
      <h1 className=" text-xl font-bold flex  items-center gap-2">
        <HiLightningBolt />
        Bolt
      </h1>
    </Link>
  );
};

export default Logo;
