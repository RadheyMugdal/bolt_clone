import { commonFiles } from "./common";

export const VITE_REACT_TS_TEMPLATE = {
  files: {
    "/src/App.tsx": {
      code: `import React from "react";  
      import "./index.css";
export default function App() {   
  const data: string = "radhey";    
  return <h1 className="text-red-500" >Hello {data}</h1>; 
}`,
    },
    "/eslint.config.mjs": {
      code: `import js from '@eslint/js'; 
import globals from 'globals'; 
import reactHooks from 'eslint-plugin-react-hooks'; 
import reactRefresh from 'eslint-plugin-react-refresh'; 
import tseslint from 'typescript-eslint';  

export default tseslint.config(
  { ignores: ['dist'] },
  {     
    extends: [js.configs.recommended, ...tseslint.configs.recommended],     
    files: ['**/*.{ts,tsx}'],     
    languageOptions: {       
      ecmaVersion: 2020,       
      globals: globals.browser,     
    },     
    plugins: {       
      'react-hooks': reactHooks,       
      'react-refresh': reactRefresh,     
    },     
    rules: {       
      ...reactHooks.configs.recommended.rules,       
      'react-refresh/only-export-components': [         
        'warn',         
        { allowConstantExport: true },       
      ],     
    },   
  } 
);`,
    },
    "/src/index.tsx": {
      code: `import React, { StrictMode } from "react"; 
import { createRoot } from "react-dom/client"; 
import "./index.css";  

import App from "./App";  

const root = createRoot(document.getElementById("root") as HTMLElement); 
root.render(   
  <StrictMode>     
    <App />   
  </StrictMode> 
);`,
    },
    "/src/index.html": {
      code: `<!DOCTYPE html> 
<html lang="en">   
  <head>     
    <meta charset="UTF-8" />     
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />    
    <title>Vite App</title>   
  </head>   
  <body>     
    <div id="root"></div>     
    <script type="module" src="/src/index.tsx"></script>   
  </body> 
</html>`,
    },
    "/tsconfig.json": {
      code: JSON.stringify(
        {
          files: [],
          references: [
            { path: "./tsconfig.app.json" },
            { path: "./tsconfig.node.json" },
          ],
        },
        null,
        2
      ),
    },
    "/tsconfig.node.json": {
      code: JSON.stringify(
        {
          compilerOptions: {
            composite: true,
            module: "ESNext",
            moduleResolution: "Node",
            allowSyntheticDefaultImports: true,
          },
          include: ["vite.config.ts"],
        },
        null,
        2
      ),
    },
    "/package.json": {
      code: JSON.stringify(
        {
          scripts: {
            dev: "vite",
            build: "tsc && vite build",
            preview: "vite preview",
          },
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
        },
        null,
        2
      ),
    },
    "/src/vite-env.d.ts": {
      code: '/// <reference types="vite/client" />',
    },
    "/vite.config.ts": {
      code: `import { defineConfig } from "vite"; 
import react from "@vitejs/plugin-react"; 
import tailwindcss from "tailwindcss"; 

// https://vitejs.dev/config/ 
export default defineConfig({   
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  }, 
});`,
    },
    "/src/index.css": {
      code: `@tailwind base; 
@tailwind components; 
@tailwind utilities;



`,
    },
    "/postcss.config.js": {
      code: `export default {   
  plugins: {     
    tailwindcss: {},     
    autoprefixer: {},   
  }, 
};`,
    },
    "/tailwind.config.js": {
      code: `/** @type {import('tailwindcss').Config} */ 
export default {     
  content: ["./src/index.html", "./src/**/*.{js,ts,jsx,tsx}"],   
  theme: {     
    extend: {

    },   
  },   
  plugins: [], 
};`,
    },
  },
  main: "/src/App.tsx",
  environment: "node",
};
