import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWebContainer } from "@/hooks/useWebContainer";
import { convertSandpackToWebContainers } from "@/lib/react-ts-template/common";
import { startApplication } from "@/lib/webcontainer";
import {
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackFiles,
  SandpackLayout,
  useSandpack,
} from "@codesandbox/sandpack-react";
import JSZip from "jszip";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import Preview from "./Preview";

export type LoadingState =
  | "Idle"
  | "Installing dependencies"
  | "Starting the application"
  | "Mounting the files";

export default function SandpackEditor() {
  const { sandpack } = useSandpack();
  const webContainer = useWebContainer();
  const [loadingState, setLoadingState] = useState<LoadingState>("Idle");
  const [url, setUrl] = useState("");
  const handleExportCode = async () => {
    const zip = new JSZip();
    await Object.entries(sandpack.files).forEach(([filePath, file]) => {
      zip.file(filePath, file.code);
    });

    const content = await zip.generateAsync({ type: "blob" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "example.zip";
    link.click();

    URL.revokeObjectURL(link.href);
  };
  useEffect(() => {
    if (!webContainer) return;
    startApplication(webContainer, sandpack.files, setUrl, setLoadingState);
  }, [webContainer]);

  useEffect(() => {
    if (!webContainer) return;
    const mountFiles = async (files: SandpackFiles) => {
      const webContainerfiles = convertSandpackToWebContainers(sandpack.files);
      await webContainer.mount(webContainerfiles);
    };
    mountFiles(sandpack.files);
  }, [sandpack.files]);
  return (
    <div className=" w-full h-full px-4 py-2  ">
      <Tabs defaultValue="code" className=" w-full h-full bg-card rounded-lg  ">
        <div className=" flex justify-between items-center mx-2 mt-2">
          <TabsList>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <button
            onClick={handleExportCode}
            className=" flex items-center gap-2 mx-2 cursor-pointer border hover:bg-background p-2 rounded-lg"
          >
            <Download size={18} />
            Export code
          </button>
        </div>
        <TabsContent value="code" className=" ">
          <SandpackLayout
            className=" bg-card"
            style={{
              width: "100%",
              height: "80% !important ",
              display: "flex",
              backgroundColor: "",
              overflow: "scroll",
            }}
          >
            <SandpackFileExplorer
              style={{
                height: "84vh",
              }}
            />
            <SandpackCodeEditor
              showLineNumbers
              showTabs={false}
              closableTabs
              showInlineErrors
              style={{
                height: "84vh",
                backgroundColor: "",
              }}
            />
          </SandpackLayout>
        </TabsContent>
        <TabsContent value="preview" className=" w-full h-full  px-1  ">
          <Preview url={url} loadingState={loadingState} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
