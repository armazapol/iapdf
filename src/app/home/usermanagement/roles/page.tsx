


import TableRolesAsync from "@/components/TableRolesAsync";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Roles() {
  // const { loading, setLoading } = useLoading();
  //   useEffect(() => {
  //     setLoading(true);
  //       // Simula carga
  //     setTimeout(() => setLoading(false), 1000);
  // },[]);

  return (
    <div>
      <Suspense fallback={<Skeleton height="504px" width="100%" />}>
        <TableRolesAsync />
      </Suspense>
    </div>
  );
}
