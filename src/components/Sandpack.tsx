import { VITE_REACT_TS_TEMPLATE } from "@/lib/react-ts-template";
import {
  loadSandpackClient,
  SandboxSetup,
  SandpackClient,
} from "@codesandbox/sandpack-client";
import {
  Sandpack,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Preview from "./Preview";

export default function SandpackEditor() {
  return (
    <div className=" w-full h-full p-4">
      <Tabs defaultValue="code" className=" w-full h-full">
        <TabsList>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="">
          <SandpackProvider
            files={VITE_REACT_TS_TEMPLATE.files}
            theme={"dark"}
            style={{
              height: "100%",
              width: "100%",
              border: "none",
            }}
          >
            <SandpackLayout>
              <SandpackFileExplorer
                className=" w-full h-full"
                style={{
                  height: "90vh",
                }}
              />
              <SandpackCodeEditor
                showTabs
                closableTabs
                showInlineErrors
                style={{
                  height: "90vh",
                }}
              />
            </SandpackLayout>
            <div id="preview"></div>
          </SandpackProvider>
        </TabsContent>
        <TabsContent value="preview">
          <Preview />
        </TabsContent>
      </Tabs>
    </div>
  );
}
