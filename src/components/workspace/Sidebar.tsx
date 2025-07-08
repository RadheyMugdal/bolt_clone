import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Logo from "../global/Logo";
import Logout from "./Logout";
import NewChatButton from "./NewChatButton";
import SidebarCloseButton from "./SidebarCloseButton";
import WorkspacesList from "./WorkspacesList";

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className=" flex flex-row items-center justify-between p-2">
        <Logo />
        <SidebarCloseButton />
      </SidebarHeader>
      <SidebarContent>
        <div className=" w-full p-4">
          <NewChatButton />
        </div>
        <SidebarGroup className=" flex-1 flex flex-col  ">
          <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
          <WorkspacesList />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className=" py-3">
          <Logout />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
