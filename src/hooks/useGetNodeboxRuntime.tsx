import { Nodebox } from "@codesandbox/nodebox";
import { useCallback, useEffect, useState } from "react";

export const useGetNodeboxRuntime = () => {
  const [runtime, setRuntime] = useState<Nodebox | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (runtime) return;

    const iframe = document.getElementById(
      "nodebox-iframe"
    ) as HTMLIFrameElement;

    if (!iframe) return;

    const nodeboxInstance = new Nodebox({ iframe });
    setRuntime(nodeboxInstance);

    nodeboxInstance.connect().then(() => {
      setIsConnected(true);
    });
  }, []);

  const updateRuntimeFiles = useCallback(async (files: any) => {
    if (!runtime) return;

    await runtime.fs.init({ files });
  }, []);

  const runCode = useCallback(async () => {
    if (!runtime) return;

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
