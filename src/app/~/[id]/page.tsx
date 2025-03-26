"use client";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import Chat from "@/components/Chat";
import SandpackEditor from "@/components/Sandpack";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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
  const { isLoading, data } = useGetWorkspaceData(id as string);

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
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
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
            <ResizablePanel minSize={40}>
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
