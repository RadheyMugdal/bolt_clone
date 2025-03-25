import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useCreateWorkspace = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["create-workspace"],
    mutationFn: async (message: string) => {
      const res = await axios.post("/api/workspaces", {
        message,
      });
      console.log(res.data);

      return res.data;
    },
    onSuccess(data, variables, context) {
      router.push(`/~/${data.id}`);
    },
  });
};
