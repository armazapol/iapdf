import { getUsers } from "@/app/actions";
import TableUsers from "@/components/TableUsers";

export default async function Users() {
  const users = await getUsers();

  return (
    <>
      <TableUsers entity="user" data={users} />
    </>
  );
}
