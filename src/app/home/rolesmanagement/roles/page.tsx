import { getRoles } from "@/app/actions";
import TableRoles from "@/components/TableRoles";

export default async function Roles() {
  const Roles = await getRoles({ only_active: "false" });

  return (
    <>
      <TableRoles entity="Role" roles={Roles.data} />
    </>
  );
}
