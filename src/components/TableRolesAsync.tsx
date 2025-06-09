

import TableRoles from "./TableRoles";
import { getRoles } from "@/app/actions";

export default async function TableRolesAsync() {
  
  const Roles = await getRoles();
  return (
    <>
      <TableRoles entity="Role" roles={Roles.data} />
    </>
  );
}
