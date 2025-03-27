import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateWorkspace = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["create-workspace"],
    mutationFn: async (message: string) => {
      const res = await axios.post("/api/workspaces", {
        message,
      });

      if (res.status !== 200) {
        toast.error("Error creating workspace.");
      }

      return res.data;
    },
    onSuccess(data) {
      router.push(`/~/${data.id}`);
    },
  });
};
