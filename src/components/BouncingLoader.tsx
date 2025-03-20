import { Circle } from "lucide-react";
import React from "react";

const BouncingLoader = () => {
  return (
    <div className="flex space-x-2  justify-center ">
      <Circle
        className=" w-2  animate-bounce"
        style={{ animationDelay: "0s" }}
      />
      <Circle
        className="w-2 animate-bounce"
        style={{ animationDelay: "0.2s" }}
      />
      <Circle
        className="w-2  animate-bounce"
        style={{ animationDelay: "0.4s" }}
      />
    </div>
  );
};

export default BouncingLoader;
