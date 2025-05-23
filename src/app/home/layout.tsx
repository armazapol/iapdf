import { getUser } from "../actions";
import Dashboard from "@/components/Dashboard";
export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getUser();
  // const profile = {
  //   idUser: 1,
  //   email: "string",
  //   username: "string",
  //   role: "string",
  // };

  return (
    <div className="flex h-screen font-sans text-gray-800 overflow-hidden">
      <Dashboard profile={profile}>{children}</Dashboard>
      {/* <Sidebar routes={routes} routesother={routesother} />
      <Header
        routes={routes}
        routesother={routesother}
        profile={profile}
        descriptions={descriptions}
      >
        {children}
      </Header> */}
      {/* <div className="flex-1 overflow-y-auto">{children}</div> */}
    </div>
  );
}
