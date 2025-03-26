"use client";
import { WebContainer } from "@webcontainer/api";
import { createContext, useContext, useEffect, useState } from "react";

type WebContainerContextType = {
  webContainer: WebContainer | null;
};

const WebContainerContext = createContext<WebContainerContextType>({
  webContainer: null,
});

export const WebContainerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [webContainer, setWebContainer] = useState<WebContainer | null>(null);
  useEffect(() => {
    const init = async () => {
      const container = await WebContainer.boot();
      setWebContainer(container);
    };
    init();
  }, []);

  return (
    <WebContainerContext.Provider value={{ webContainer }}>
      {children}
    </WebContainerContext.Provider>
  );
};

export const useWebContainer = () => {
  const context = useContext(WebContainerContext);
  if (!context) {
    throw new Error(
      "useWebContainer must be used within a WebContainerProvider."
    );
  }
  return context;
};
