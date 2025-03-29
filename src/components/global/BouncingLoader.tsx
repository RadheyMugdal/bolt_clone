import { GoDotFill } from "react-icons/go";

const BouncingLoader = () => {
  return (
    <div className="flex space-x-2  justify-center ">
      <GoDotFill
        className=" animate-bounce m-0"
        style={{ animationDelay: "0s" }}
      />
      <GoDotFill
        className=" animate-bounce p-0 m-0"
        style={{ animationDelay: "0.2s" }}
      />
      <GoDotFill
        className=" animate-bounce m-0"
        style={{ animationDelay: "0.4s" }}
      />
    </div>
  );
};

export default BouncingLoader;
