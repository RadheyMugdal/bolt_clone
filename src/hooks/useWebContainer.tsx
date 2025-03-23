import { useEffect, useState } from "react";
import { WebContainer } from "@webcontainer/api";

let webContainerInstance: WebContainer | null = null;

export function useWebContainer() {
  const [webcontainer, setWebcontainer] = useState<WebContainer | null>(null);

  useEffect(() => {
    async function initWebContainer() {
      if (!webContainerInstance) {
        webContainerInstance = await WebContainer.boot();
      }
      setWebcontainer(webContainerInstance);
    }

    initWebContainer();
  }, []);

  return webcontainer;
}
