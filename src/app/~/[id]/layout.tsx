import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/workspace/Sidebar";
import SidebarTrigger from "@/components/workspace/SidebarTrigger";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className=" w-full h-full grow" defaultOpen={false}>
      <AppSidebar />
      <main className=" w-full h-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
