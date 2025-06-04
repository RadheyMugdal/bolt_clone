"use client";

import { ArrowUp } from "lucide-react";
import { motion } from "motion/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

import StaggerTextAnimation from "@/components/global/StaggerTextAnimation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateWorkspace } from "@/hooks/workspace/useCreateWorkspace";
import { useDialogStore } from "@/store/dialogStore";
import { SandpackBundlerFiles } from "@codesandbox/sandpack-client";

export interface ProjectData {
  files: SandpackBundlerFiles;
}

export default function Home() {
  const { setOpen } = useDialogStore();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const { mutateAsync } = useCreateWorkspace();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!session) {
      setOpen(true);
      setLoading(false);
      return;
    }

    await mutateAsync(message);
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center h-full gap-8">
      <section className="flex flex-col items-center gap-4 text-center">
        <div className="flex flex-col gap-8">
          <StaggerTextAnimation
            text="What do you want to build?"
            delay={0.5}
            className=" text-5xl tracking-tighter"
          />
          <StaggerTextAnimation
            text="Describe your idea. Prompt, run, and generate beautiful websites instantly."
            delay={1.5}
            className=" text-xs  tracking-normal"
          />
        </div>
      </section>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <motion.div
          className="  bg-input/30 p-2 w-full  rounded-lg flex flex-col focus-within:outline"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 2,
              ease: "easeInOut",
              duration: 1,
            },
          }}
        >
          <Textarea
            placeholder="Start by describing your project"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className=" border-none !bg-transparent text-xs font-normal !ring-0 resize-none !outline-none"
            rows={4}
            disabled={loading}
          />
          <div className="w-full p-2 flex justify-end">
            <Button
              type="submit"
              variant="secondary"
              size="icon"
              className="ml-auto"
              aria-label="Submit project prompt"
              disabled={loading || message.trim() === ""}
            >
              <ArrowUp />
            </Button>
          </div>
        </motion.div>
      </form>
    </main>
  );
}
