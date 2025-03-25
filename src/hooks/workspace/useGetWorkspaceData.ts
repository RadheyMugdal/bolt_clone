import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetWorkspaceData = (id: string) => {
  return useQuery({
    queryKey: ["workspace-data"],
    queryFn: async () => {
      const res = await axios.get(`/api/workspace/${id}`);

      return res.data;
    },
  });
};
