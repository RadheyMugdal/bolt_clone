import { SandpackFile } from "@codesandbox/sandpack-react";

export const commonFiles = {
  "/styles.css": {
    code: `body {
  font-family: sans-serif;
  -webkit-font-smoothing: auto;
  -moz-font-smoothing: auto;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: auto;
  text-rendering: optimizeLegibility;
  font-smooth: always;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

h1 {
  font-size: 1.5rem;
}`,
  },
};

// Define the SandpackFile interface

export function convertSandpackToWebContainers(
  files: Record<string, string | SandpackFile>
): Record<string, any> {
  const result: Record<string, any> = {};

  // Process each file path
  Object.entries(files).forEach(([path, content]) => {
    // Extract the file content
    const fileContent = typeof content === "string" ? content : content.code;

    // Split the path into segments
    const pathSegments = path.split("/").filter((segment) => segment !== "");
    const fileName = pathSegments.pop() || "";

    // If there are no directory segments, it's a file at the root
    if (pathSegments.length === 0) {
      result[fileName] = {
        file: {
          contents: fileContent,
        },
      };
      return;
    }

    // For directories, recursively build the structure
    let currentPath = result;
    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];

      // Create the segment if it doesn't exist
      if (!currentPath[segment]) {
        currentPath[segment] = {
          directory: {},
        };
      }

      // Move to the directory's contents
      currentPath = currentPath[segment].directory;
    }

    // Add the file at the final level
    currentPath[fileName] = {
      file: {
        contents: fileContent,
      },
    };
  });

  return result;
}
