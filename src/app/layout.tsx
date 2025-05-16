import "./globals.css";
import { LoadingProvider } from "@/components/providers/LoadingProvider";
import { Loader } from "@/components/Loader";
import { TanstackProvider } from "@/components/providers/tanstack-provider";

export const metadata = {
  title: "Mandy Lí",
  description: "Sistema de autenticación",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100">
        <div id="main">
          <TanstackProvider>
            <LoadingProvider>
              <Loader />
              {children}
            </LoadingProvider>
          </TanstackProvider>
        </div>
      </body>
    </html>
  );
}
