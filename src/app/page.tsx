"use client";
import LoginDialog from "@/components/dialogs/LoginDialog";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "@/hooks/workspace/useCreateWorkspace";
import { SandpackBundlerFiles } from "@codesandbox/sandpack-client";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export interface ProjectData {
  files: SandpackBundlerFiles;
}

export default function Home() {
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const { mutateAsync, data } = useCreateWorkspace();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      setLoginDialogOpen(true);
      return;
    }
    await mutateAsync(message);
  };

  return (
    <main className="   flex flex-col items-center h-full justify-center gap-6    ">
      <div className=" flex flex-col items-center gap-3 ">
        <h1 className=" text-5xl font-bold">What do you want to build?</h1>
        <p className=" opacity-60">
          Start by describing what you want to create.
        </p>
      </div>
      <form
        action=""
        className=" flex  max-w-xl w-full rounded-lg border  border-foreground/20"
        onSubmit={handleSubmit}
      >
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name=""
          id=""
          className="  p-4  w-full  resize-none  focus:outline-0 focus:ring-0"
          rows={4}
        />
        <div className=" flex items-center p-4">
          <Button type="submit" className=" cursor-pointer" disabled={!message}>
            <ArrowRight size={20} className=" text-black" />
          </Button>
        </div>
      </form>
      <LoginDialog
        loaginDialogOpen={loginDialogOpen}
        setLoginDialogOpen={setLoginDialogOpen}
      />
    </main>
  );
}
