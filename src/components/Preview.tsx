"use client";
import { useGetNodeboxRuntime } from "@/hooks/useGetNodeboxRuntime";
import { NEXT_14_TEMPLATE } from "@/lib/next-js-template";
import { VITE_REACT_TS_TEMPLATE } from "@/lib/react-ts-template";
import {
  ClientOptions,
  loadSandpackClient,
  SandboxSetup,
} from "@codesandbox/sandpack-client";
import React, { useEffect } from "react";

const Preview = () => {
  const { updateRuntimeFiles, runCode } = useGetNodeboxRuntime();
  async function main() {
    // Iframe selector or element itself
    const iframe = document.getElementById("iframe") as HTMLIFrameElement;

    // Files, environment and dependencies
    const content: SandboxSetup = {
      files: {
        // We infer dependencies and the entry point from package.json
        "/package.json": {
          code: JSON.stringify({
            main: "index.js",
            dependencies: { uuid: "latest" },
          }),
        },

        // Main file
        "/index.js": { code: `console.log(require('uuid'))` },
      },
      entry: "/index.js",
      dependencies: {
        uuid: "latest",
      },
    };

    // Optional options
    const options: ClientOptions = {
      externalResources: ["https://cdn.tailwindcss.com"],
    };

    // Properly load and mount the bundler
    const client = await loadSandpackClient(iframe, content, options);

    /**
     * When you make a change, you can just run `updateSandbox`.
     * We'll automatically discover which files have changed
     * and hot reload them.
     */
    client.updateSandbox({
      files: VITE_REACT_TS_TEMPLATE.files,
      entry: "/src/app/page.tsx",
      dependencies: {
        react: "^18.0.0",
        "react-dom": "^18.0.0",
        "lucide-react": "^0.482.0",
        "react-router-dom": "^6.21.1",
      },
      devDependencies: {
        "@types/react": "^18.0.0",
        "@types/react-dom": "^18.0.0",
        "@vitejs/plugin-react": "^4.3.4",
        typescript: "^4.9.5",
        vite: "4.2.0",
        "esbuild-wasm": "^0.17.12",
        tailwindcss: "^3.4.0",
        postcss: "^8.4.0",
        autoprefixer: "^10.4.0",
      },
    });
  }
  useEffect(() => {
    // updateRuntimeFiles(VITE_REACT_TS_TEMPLATE.files);
    main();
  }, []);
  return (
    <div
      className=" h-full
    "
    >
      <iframe id="iframe" className=" w-full h-full">
        {" "}
      </iframe>
    </div>
  );
};

export default Preview;
