import { getUser } from "../actions";
import Dashboard from "@/components/Dashboard";
export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getUser();

  return (
    <div className="flex h-screen font-sans text-gray-800 overflow-hidden">
      <Dashboard profile={profile}>{children}</Dashboard>
    </div>
  );
}
