"use client";
import Chat from "@/components/Chat";
import SandpackEditor from "@/components/Sandpack";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { vite_template } from "@/lib/react-ts-template";
import { SandpackBundlerFiles } from "@codesandbox/sandpack-client";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import { useState } from "react";

export interface ProjectData {
  files: SandpackBundlerFiles;
}

export default function Home() {
  const [projectData, setProjectData] = useState<ProjectData | undefined>();

  return (
    <main className=" w-screen h-screen  flex flex-col  transition-all duration-500 ease-in-out ">
      <header className=" p-2 border-b flex items-center justify-between ">
        <h1 className=" text-xl font-bold">Bolt</h1>
      </header>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={30}>
          <Chat setProjectData={setProjectData} projectData={projectData} />
        </ResizablePanel>
        {projectData && projectData.files && (
          <>
            <ResizableHandle />
            <ResizablePanel minSize={40}>
              <SandpackProvider
                options={{
                  activeFile: "/src/App.tsx",
                }}
                files={{
                  ...vite_template,
                  ...projectData.files,
                }}
                customSetup={{
                  entry: "/src/App.tsx",
                }}
                theme={"dark"}
                className=""
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <SandpackEditor />
              </SandpackProvider>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </main>
  );
}
