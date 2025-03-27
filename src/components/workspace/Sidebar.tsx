import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import Link from "next/link";
import Logo from "../Logo";
import { Button } from "../ui/button";
import NewChatButton from "./NewChatButton";
import WorkspacesList from "./WorkspacesList";

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className=" flex flex-row items-center justify-between p-2">
        <Logo />
        <SidebarTrigger size={"lg"} />
      </SidebarHeader>
      <SidebarContent>
        <div className=" w-full p-4">
          <NewChatButton />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
          <WorkspacesList />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className=" py-3">
          <Link href={"/"}>
            <Button className=" w-full" variant={"secondary"}>
              <LogOut />
              Logout
            </Button>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
