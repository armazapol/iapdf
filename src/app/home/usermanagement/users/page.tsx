import { getUsers } from "@/app/actions";
import TableUsers from "@/components/TableUsers";
import "react-loading-skeleton/dist/skeleton.css";

export default async function Users() {
  // const { loading, setLoading } = useLoading();
  //   useEffect(() => {
  //     setLoading(true);
  //       // Simula carga
  //     setTimeout(() => setLoading(false), 1000);
  // },[]);
  //<Skeleton height="504px" width="100%" />
  const users = await getUsers()
  
  return (
    <div>
      <TableUsers entity="user" data={users} />
    </div>  
  );
}
