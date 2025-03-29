import { SandpackBundlerFiles } from "@codesandbox/sandpack-client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export const useGenerateProject = (
  setProjectData: React.Dispatch<
    React.SetStateAction<SandpackBundlerFiles | undefined>
  >,
  setMessages: React.Dispatch<React.SetStateAction<any>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const id = useParams().id;
  return useMutation({
    mutationKey: ["generate-project"],
    mutationFn: async (message: any) => {
      const res = await axios.post("/api/chat", {
        messages: message,
        workspaceId: id,
      });
      if (res.status !== 200) {
        throw new Error("Something went wrong");
      }
      return res.data;
    },
    onSuccess(data, variables, context) {
      setProjectData(data.files);

      setMessages((prev: any) => [
        ...prev,
        {
          ...data.messagesData,
        },
      ]);
    },
    onError: () => {
      toast.error("Something went wrong while processing your request");
    },
    onSettled(data, error, variables, context) {
      setLoading(false);
    },
  });
};
