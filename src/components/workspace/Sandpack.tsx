import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { convertSandpackToWebContainers } from "@/lib/react-ts-template/common";
import { startApplication } from "@/lib/webcontainer";
import { useWebContainer } from "@/providers/web-container";
import {
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackLayout,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { saveAs } from "file-saver";
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
  const { webContainer } = useWebContainer();
  const [loadingState, setLoadingState] = useState<LoadingState>("Idle");
  const [url, setUrl] = useState("");
  const handleExportCode = async () => {
    const zip = new JSZip();
    await Object.entries(sandpack.files).forEach(([filePath, file]) => {
      zip.file(filePath.replace("/", ""), file.code);
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "project.zip");
    });
  };
  useEffect(() => {
    if (!webContainer) return;
    startApplication(webContainer, sandpack.files, setUrl, setLoadingState);
  }, [webContainer]);

  useEffect(() => {
    if (!webContainer) return;
    const mountFiles = async () => {
      const webContainerfiles = convertSandpackToWebContainers(sandpack.files);
      await webContainer.mount(webContainerfiles);
    };
    mountFiles();
  }, [sandpack.files, webContainer]);
  return (
    <div className=" w-full h-full px-4 py-2  ">
      <Tabs
        defaultValue="code"
        className=" w-full h-full bg-secondary rounded-lg  "
      >
        <div className=" flex justify-between items-center mx-2 mt-2">
          <TabsList className=" bg-background rounded-full">
            <TabsTrigger value="code" className=" rounded-full">
              Code
            </TabsTrigger>
            <TabsTrigger value="preview" className=" rounded-full">
              Preview
            </TabsTrigger>
          </TabsList>
          <button
            onClick={handleExportCode}
            className=" flex items-center gap-2 mx-2 cursor-pointer bg-background text-primary hover:text-primary/80 border-primary/20 border   p-2 rounded-lg"
          >
            <Download size={18} />
            Export code
          </button>
        </div>
        <TabsContent value="code" className=" ">
          <SandpackLayout
            className=" bg-secondary"
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
        <TabsContent value="preview" className=" w-full h-full   px-1  ">
          <Preview url={url} loadingState={loadingState} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
