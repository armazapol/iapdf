import UserForm from '@/components/User.Form'

type Params = {
  params: { id: string }; 
};

export default function editUserPage({ params }: Params) {

  const { id } = params;

  return (
    <div>
        <UserForm evento="Edit" userId={id} ></UserForm>
    </div>
  )
}
