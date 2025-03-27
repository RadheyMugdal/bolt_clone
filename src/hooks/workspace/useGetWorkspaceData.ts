import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetWorkspaceData = (id: string) => {
  return useQuery({
    queryKey: ["workspace-data", id],
    queryFn: async () => {
      const res = await axios.get(`/api/workspace/${id}`);
      if (res.status !== 200) {
        throw new Error("Error getting workspace data");
      }
      return res.data;
    },
  });
};
