import Dashboard from "@/components/Dashboard";
import { AuthProvider } from "@/context/AuthContext";
export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex h-screen font-sans text-gray-800 overflow-hidden">
        <Dashboard>{children}</Dashboard>
      </div>
    </AuthProvider>
  );
}
