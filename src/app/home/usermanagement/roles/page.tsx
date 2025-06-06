
import TableRolesAsync from "@/components/TableRolesAsync";
import { Suspense } from "react";

import Loading from "@/components/Loading";

export default function Roles() {

  return (
    <>
      <Suspense fallback={ <Loading /> }>
        <TableRolesAsync />
      </Suspense> 
    </>
  );
}
