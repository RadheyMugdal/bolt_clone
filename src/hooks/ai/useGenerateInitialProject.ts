import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

export const useGenerateInitialProject = (messages: any) => {
  const id = useParams().id;
  return useQuery({
    queryKey: ["generate-initial-project", id],
    queryFn: async () => {
      if (messages.length === 1 && messages[0].role === "user") {
        const res = await axios.post(`/api/chat?init=${true}`, {
          messages: [
            {
              role: "user",
              content: messages[0].message,
            },
          ],
          workspaceId: id,
        });

        if (res.status !== 200) {
          throw new Error("Something went wrong while generating application");
        }

        return res.data;
      }
      return null;
    },
  });
};
