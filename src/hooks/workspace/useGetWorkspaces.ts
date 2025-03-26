import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetWorkspaces = () => {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const res = await axios.get("/api/workspaces");
      if (res.status !== 200) throw new Error("Failed to fetch workspaces");
      return res.data;
    },
  });
};
