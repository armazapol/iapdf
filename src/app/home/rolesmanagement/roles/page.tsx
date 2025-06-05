
import TableRolesAsync from "@/components/TableRolesAsync";
import { Suspense } from "react";

import Loading from "@/components/Loading";

export default function Roles() {

  return (
    <div>
      <Suspense fallback={ <Loading /> }>
        <TableRolesAsync />
      </Suspense> 
    </div>
  );
}
