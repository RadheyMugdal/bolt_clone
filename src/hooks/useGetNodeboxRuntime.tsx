import { useEffect, useRef, useState, useCallback } from "react";
import { Nodebox } from "@codesandbox/nodebox";

export const useGetNodeboxRuntime = () => {
  const [runtime, setRuntime] = useState<Nodebox | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (runtime) return;

    const iframe = document.getElementById(
      "nodebox-iframe"
    ) as HTMLIFrameElement;

    if (!iframe) return;
    console.log("here iframe");

    const nodeboxInstance = new Nodebox({ iframe });
    setRuntime(nodeboxInstance);

    nodeboxInstance.connect().then(() => {
      setIsConnected(true);
    });
  }, []);

  const updateRuntimeFiles = useCallback(async (files: any) => {
    if (!runtime) return;
    console.log("here");

    await runtime.fs.init({ files });
  }, []);

  const runCode = useCallback(async () => {
    if (!runtime) return;
    console.log("here");

    const shell = runtime.shell.create();
    const nextProcess = await shell.runCommand("npm", ["dev"]);
    const previewInfo = await runtime.preview.getByShellId(nextProcess.id);
    const previewIframe = document.getElementById(
      "preview-iframe"
    ) as HTMLIFrameElement;
    console.log(previewInfo.url);

    previewIframe.setAttribute("src", previewInfo.url);
  }, []);

  return { runtime: runtime, isConnected, updateRuntimeFiles, runCode };
};
