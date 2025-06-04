import { auth } from "@/auth";
import LoginDialog from "@/components/dialogs/LoginDialog";
import Header from "@/components/global/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AppSidebar } from "@/components/workspace/Sidebar";
import SidebarTrigger from "@/components/workspace/SidebarTrigger";
import CustomQueryClientProvider from "@/providers/query-client-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { WebContainerProvider } from "@/providers/web-container";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bolt.new",
  description: "Ai website builder",
  icons: {
    icon: "/logo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <CustomQueryClientProvider>
        <body className={`${inter.className} antialiased`}>
          <SessionProvider>
            <WebContainerProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <SidebarProvider defaultOpen={false}>
                  <main className="  relative flex flex-col z-0 w-screen h-screen overflow-hidden     ">
                    <div className="absolute inset-0 -z-10 bg-radial-[at_0%_0%] from-blue-400/20 via-transparent  via-30% " />
                    <div className="absolute inset-0 -z-10 bg-radial-[at_100%_100%] from-violet-500/20 via-transparent  via-30% " />

                    {session?.user && (
                      <>
                        <AppSidebar />
                        <SidebarTrigger />
                      </>
                    )}

                    <Header />
                    <div className=" min-h-0 grow">{children}</div>
                    <LoginDialog />
                    <Toaster />
                  </main>
                </SidebarProvider>
              </ThemeProvider>
            </WebContainerProvider>
          </SessionProvider>
        </body>
      </CustomQueryClientProvider>
    </html>
  );
}
