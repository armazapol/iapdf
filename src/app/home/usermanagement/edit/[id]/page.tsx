import UserForm from "@/components/User.Form";

type Params = {
  params: Promise<{ id: string }>;
};

export default async function editUserPage({ params }: Params) {
  const { id } = await params;
  return (
    <div>
      <UserForm evento="Edit" idUser={Number(id)}></UserForm>
    </div>
  );
}
