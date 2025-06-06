
import Dashboard from "@/components/Dashboard";
export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex h-screen font-sans text-gray-800 overflow-hidden">
      <Dashboard >{children}</Dashboard>
    </div>
  );
}
