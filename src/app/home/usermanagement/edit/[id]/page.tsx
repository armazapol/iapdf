import UserForm from '@/components/User.Form'

type Params = {
  params: { id: string }; 
};

export default async function editUserPage({ params }: Params) {

  const id = parseInt(params.id, 10)
  return (
    <div>
        <UserForm evento="Edit" idUser={id} ></UserForm>
    </div>
  )
}
