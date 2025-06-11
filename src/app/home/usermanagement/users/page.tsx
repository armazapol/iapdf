
import "react-loading-skeleton/dist/skeleton.css";
import { Suspense } from "react";
import TableUsersAsync from "@/components/TableUsersAsync";

import LoadingComponent from "@/components/LoadingComponent";

export default async function Users() {

  return (
    <>
      <Suspense fallback={ <LoadingComponent size="sm" />} >
        <TableUsersAsync />
      </Suspense>
    </>  
  );
}
