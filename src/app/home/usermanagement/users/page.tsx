
import "react-loading-skeleton/dist/skeleton.css";
import { Suspense } from "react";
import TableUsersAsync from "@/components/TableUsersAsync";
import Skeleton from "react-loading-skeleton";

export default async function Users() {
  // const { loading, setLoading } = useLoading();
  //   useEffect(() => {
  //     setLoading(true);
  //       // Simula carga
  //     setTimeout(() => setLoading(false), 1000);
  // },[]);
  //<Skeleton height="504px" width="100%" />
  // const users = await getUsers()
  
  return (
    <div>
      <Suspense fallback={<Skeleton height="504px" width="100%" />} >
        <TableUsersAsync />
      </Suspense>
    </div>  
  );
}
