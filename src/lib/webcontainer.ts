import { SandpackFiles } from "@codesandbox/sandpack-react";
import { WebContainer } from "@webcontainer/api";
import { convertSandpackToWebContainers } from "./react-ts-template/common";
import React from "react";

export async function startApplication(
  WebContainer: WebContainer,
  files: SandpackFiles,
  setUrl: React.Dispatch<React.SetStateAction<string>>
) {
  try {
    if (!WebContainer) return;
    const convertedFiles = convertSandpackToWebContainers(files);
    await WebContainer.mount(convertedFiles);
    const installProcess = await WebContainer.spawn("npm", ["install"]);
    installProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log(data);
        },
      })
    );
    await installProcess.exit;
    await WebContainer.spawn("npm", ["run", "dev"]);
    WebContainer.on("server-ready", (port, url) => {
      setUrl(url);
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
