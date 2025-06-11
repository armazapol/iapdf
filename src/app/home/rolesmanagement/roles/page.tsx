
import TableRolesAsync from "@/components/TableRolesAsync";
import { Suspense } from "react";

import LoadingComponent from "@/components/LoadingComponent";

export default function Roles() {

  return (
    <>
      <Suspense fallback={ <LoadingComponent size="sm" /> }>
        <TableRolesAsync />
      </Suspense> 
    </>
  );
}
