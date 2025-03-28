"use client";
import { ExternalLink, Loader2, RotateCw } from "lucide-react";
import { useRef, useState } from "react";
import { LoadingState } from "./Sandpack";

const Preview = ({
  url,
  loadingState,
}: {
  url: string | undefined;
  loadingState: LoadingState;
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  function getPathName(url: string) {
    if (!url) return;
    const pathName = new URL(url).pathname;
    if (pathName) {
      return pathName;
    }
    return url;
  }
  const handleReload = () => {
    if (iframeRef.current) {
      iframeRef.current.src = url as string;
    }
  };
  const handleOpenPreview = () => {
    window.open(url as string, "_blank");
  };
  const handleUrlChange = () => {
    if (iframeRef.current) {
      const url = new URL(iframeRef.current.src);
      url.pathname = pathName;
      iframeRef.current.src = url.href;
    }
  };
  const [pathName, setPathName] = useState<string>(
    getPathName(url || "") as string
  );
  return (
    <div className="  w-full h-full">
      {loadingState === "Idle" ? (
        <div className=" w-full h-full bg-secondary border rounded-md overflow-hidden">
          <div className=" flex gap-2 items-center justify-between px-3">
            <div className=" flex gap-2 items-center w-2/3 ">
              <button
                className=" hover:bg-secondary p-1 cursor-pointer rounded-md "
                onClick={handleReload}
              >
                <RotateCw size={20} />
              </button>

              <input
                type="text"
                id="url"
                value={pathName}
                onChange={(e) => setPathName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUrlChange();
                  }
                }}
                className=" m-2 w-full p-1.5   bg-input border  rounded-full px-2  focus:ring-0 focus:outline-none"
              />
            </div>
            <div className=" flex  items-center gap-4">
              <button
                className=" hover:bg-secondary p-1 cursor-pointer rounded-md "
                onClick={handleOpenPreview}
              >
                <ExternalLink size={19} />
              </button>
            </div>
          </div>
          <iframe
            id="iframe"
            src={url}
            className=" w-full h-full"
            ref={iframeRef}
          >
            {" "}
          </iframe>
        </div>
      ) : (
        <div className=" w-full h-full flex items-center justify-center gap-2">
          <Loader2 className=" animate-spin w-4 h-4 " />
          {loadingState}
        </div>
      )}
    </div>
  );
};

export default Preview;
