"use client";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "@/hooks/workspace/useCreateWorkspace";
import { useDialogStore } from "@/store/dialogStore";
import { SandpackBundlerFiles } from "@codesandbox/sandpack-client";
import { ArrowRight, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { HiLightningBolt } from "react-icons/hi";

export interface ProjectData {
  files: SandpackBundlerFiles;
}

export default function Home() {
  const { setOpen } = useDialogStore();
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const { mutateAsync, data } = useCreateWorkspace();
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
    <main className="   flex flex-col items-center h-full justify-center gap-8    ">
      <div className=" flex flex-col items-center gap-4 ">
        <div className=" flex flex-col items-center gap-2">
          <HiLightningBolt size={50} />
          <h1 className=" text-4xl font-bold bg-gradient-to-r from-blue-500 via-pink-500 to-green-400 bg-clip-text text-transparent ">
            What do you want to build?
          </h1>
          <p className=" opacity-60">
            Prompt, run, edit and create beautiful websites.
          </p>
        </div>
      </div>
      <form
        action=""
        className=" flex bg-secondary  max-w-xl w-full  rounded-lg border "
        onSubmit={handleSubmit}
      >
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Start by describing your project"
          name=""
          id=""
          className="  p-4  w-full  resize-none  focus:outline-0 focus:ring-0"
          rows={5}
        />
        {message && (
          <div className=" flex items-center p-4">
            <Button type="submit" className=" cursor-pointer">
              {loading ? (
                <Loader2 className=" animate-spin " size={20} />
              ) : (
                <ArrowRight size={20} className=" text-black" />
              )}
            </Button>
          </div>
        )}
      </form>
    </main>
  );
}
