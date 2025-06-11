import { getRoles, getUser2 } from "@/app/actions";
import UserForm from "@/components/User.Form";

type Params = {
  params: Promise<{ id: string }>;
};

export default async function editUserPage({ params }: Params) {
  const { id } = await params;

  const user = await getUser2(Number(id));
  const roles = await getRoles();

  const roleOptions = roles.data.map((role) => ({
    value: role.rol,
    label: role.rol,
  }));

  return (
    <div>
      <UserForm
        evento="Edit"
        idUser={Number(id)}
        activity="edit"
        userData={user}
        roles={roleOptions}
      />
    </div>
  );
}
