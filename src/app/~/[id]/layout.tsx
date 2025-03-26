import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/workspace/Sidebar";
import SidebarTrigger from "@/components/workspace/SidebarTrigger";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className=" w-full h-full min-h-full" defaultOpen={false}>
      <AppSidebar />
      <main className=" w-full h-full flex  ">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
