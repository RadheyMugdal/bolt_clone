"use client";
import { useGetWorkspaces } from "@/hooks/workspace/useGetWorkspaces";
import Link from "next/link";
import { SidebarMenuButton, useSidebar } from "../ui/sidebar";
import { Skeleton } from "../ui/skeleton";

const WorkspacesList = () => {
  const { data, isLoading } = useGetWorkspaces();
  const { toggleSidebar } = useSidebar();
  if (isLoading) {
    return (
      <div className=" flex  flex-col gap-2">
        <Skeleton className=" w-full p-4 " />
        <Skeleton className=" w-full p-4 " />
        <Skeleton className=" w-full p-4 " />
        <Skeleton className=" w-full p-4 " />
        <Skeleton className=" w-full p-4 " />
        <Skeleton className=" w-full p-4 " />
        <Skeleton className=" w-full p-4 " />
      </div>
    );
  }
  return (
    <div className=" flex-1 flex  flex-col w-full overflow-y-scroll ">
      {data.map((workspace: any) => {
        return (
          <Link
            href={`/~/${workspace.id}`}
            key={workspace.id}
            onClick={toggleSidebar}
          >
            <SidebarMenuButton>
              <p>{workspace.title}</p>
            </SidebarMenuButton>
          </Link>
        );
      })}
    </div>
  );
};

export default WorkspacesList;
