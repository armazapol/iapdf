import { getUsers } from "@/app/actions";
import Users from "@/app/home/usermanagement/users/page";
import TableUsers from "@/components/TableUsers";

export default async function TableUsersAsync() {
  
  //const users = await getUsers();

  return (
    <>
      <TableUsers entity="user" data={[]} />
    </>
  );
}
