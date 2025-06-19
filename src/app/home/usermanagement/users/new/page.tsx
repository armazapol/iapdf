import { getRoles } from "@/app/actions";
import UserForm from "@/components/User.Form";

export default async function page() {
  const roles = await getRoles();
  const roleOptions = roles.data.map((role) => ({
    value: role.rol,
    label: role.rol,
  }));

  return (
    <div>
      <UserForm evento="New" activity="created" roles={roleOptions}></UserForm>
    </div>
  );
}
