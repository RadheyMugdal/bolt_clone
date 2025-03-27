import { LoadingState } from "@/components/workspace/Sandpack";
import { SandpackFiles } from "@codesandbox/sandpack-react";
import { WebContainer } from "@webcontainer/api";
import React from "react";
import { convertSandpackToWebContainers } from "./react-ts-template/common";

export async function startApplication(
  WebContainer: WebContainer,
  files: SandpackFiles,
  setUrl: React.Dispatch<React.SetStateAction<string>>,
  setLoadingState: React.Dispatch<React.SetStateAction<LoadingState>>
) {
  try {
    if (!WebContainer) return;
    setLoadingState("Mounting the files");
    const convertedFiles = convertSandpackToWebContainers(files);
    await WebContainer.mount(convertedFiles);
    setLoadingState("Installing dependencies");
    const installProcess = await WebContainer.spawn("npm", ["install"]);
    // installProcess.output.pipeTo(
    //   new WritableStream({
    //     write(data) {
    //       console.log(data);
    //     },
    //   })
    // );
    await installProcess.exit;
    setLoadingState("Starting the application");
    await WebContainer.spawn("npm", ["run", "dev"]);
    WebContainer.on("server-ready", (port, url) => {
      setUrl(url);
      setLoadingState("Idle");
    });
  } catch (error) {
    console.error(error);
  }
}

export async function bootWebContainer() {
  const webContainer = await WebContainer.boot();
  return webContainer;
}

export async function restartApplication(WebContainer: WebContainer) {
  try {
    if (!WebContainer) return;
    const processes = await WebContainer.internal.getProcesses();
    processes.forEach(({ pid }) => {});
  } catch (error) {
    console.error(error);
  }
}
