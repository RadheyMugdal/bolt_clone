import Chat from "@/components/Chat";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className=" w-screen h-screen flex    bg-[radial-gradiant(at_top_right,#001e2f,#002e3f,#003e4f,#004e5f)]">
      <Chat />
      {/* <SandpackEditor /> */}
    </main>
  );
}
