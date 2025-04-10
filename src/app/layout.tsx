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
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
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
        <body className={`${roboto.className} antialiased`}>
          <SessionProvider>
            <WebContainerProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <SidebarProvider defaultOpen={false}>
                  <main className=" flex flex-col w-screen h-screen overflow-hidden   ">
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
