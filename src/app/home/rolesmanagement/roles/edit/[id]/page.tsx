import { getRoles } from "@/app/actions";
import RolForm from "@/components/RolForm";
import React from "react";

type Params = {
  params: Promise<{ id: string }>;
};

export default async function RolFormulario({ params }: Params) {
  const { id } = await params;
  const rolesList = await getRoles({ only_active: "false" });

  return (
    <div>
      <RolForm
        entity="Edit"
        id={Number(id)}
        activity="edit"
        rolesList={rolesList}
      />
    </div>
  );
}
