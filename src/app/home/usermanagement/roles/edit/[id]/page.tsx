import RolForm from '@/components/RolForm'
import React from 'react'

type Params = {
  params: Promise<{ id: string }>;
};


export default async function RolFormulario({ params }: Params) {

   const { id } = await params;

  return (
    <div>
        <RolForm entity="Edit" id={Number(id)} activity='edit' />
    </div>
  )
}
