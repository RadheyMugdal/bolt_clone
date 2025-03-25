import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const LoginButton = () => {
  return (
    <div className=" flex items-center justify-center">
      <button
        type="button"
        className=" flex items-center gap-2 cursor-pointer bg-secondary p-2 rounded-lg text-sm px-8  "
        onClick={() => signIn("google")}
      >
        <FcGoogle size={20} />
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginButton;
