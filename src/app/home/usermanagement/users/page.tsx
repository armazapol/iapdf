
import "react-loading-skeleton/dist/skeleton.css";
import { Suspense } from "react";
import TableUsersAsync from "@/components/TableUsersAsync";
import Loading from "@/components/Loading";

export default async function Users() {

  return (
    <div>
      <Suspense fallback={ <Loading />} >
        <TableUsersAsync />
      </Suspense>
    </div>  
  );
}
