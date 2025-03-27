"use client";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Chat from "@/components/workspace/Chat";
import SandpackEditor from "@/components/workspace/Sandpack";
import { useGetWorkspaceData } from "@/hooks/workspace/useGetWorkspaceData";
import { vite_template } from "@/lib/react-ts-template";
import { SandpackBundlerFiles } from "@codesandbox/sandpack-client";
import { SandpackProvider } from "@codesandbox/sandpack-react";

export interface Message {
  role: "user" | "assistant";
  message: string;
}

const Page = () => {
  const { id } = useParams();
  const { isLoading, data, error } = useGetWorkspaceData(id as string);
  const router = useRouter();
  const [messages, setMessages] = useState<Message[] | undefined>();
  const [projectData, setProjectData] = useState<
    SandpackBundlerFiles | undefined
  >();

  useEffect(() => {
    if (!data) return;
    setMessages(data.messages);
    setProjectData(data.workspaceData.projectFiles);
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className="flex w-full items-center justify-center h-full">
        <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className=" w-full  h-full flex items-center justify-center flex-col gap-4 ">
        <h1 className=" font-bold text-7xl text-red-400 ">404</h1>
        <p className=" text-3xl opacity-60">Page not found</p>
        <p className=" w-full max-w-xl text-center opacity-90">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Check the URL or try navigating back to the homepage.
        </p>
        <Button className=" " onClick={() => router.back()}>
          <ArrowLeft />
          Go back
        </Button>
      </div>
    );
  }

  const files = {
    ...vite_template,
    ...projectData,
  };

  return (
    <div className=" w-full h-full   flex overflow-hidden  ">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={30}>
          {messages && (
            <Chat
              messages={messages}
              setMessages={setMessages}
              projectData={projectData}
              setProjectData={setProjectData}
            />
          )}
        </ResizablePanel>

        {projectData && (
          <>
            <ResizableHandle />
            <ResizablePanel minSize={40} defaultSize={65}>
              <SandpackProvider
                options={{ activeFile: "/src/App.tsx" }}
                files={files}
                customSetup={{ entry: "/src/App.tsx" }}
                theme="dark"
                style={{ width: "100%", height: "100%" }}
              >
                <SandpackEditor />
              </SandpackProvider>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
};

export default Page;
