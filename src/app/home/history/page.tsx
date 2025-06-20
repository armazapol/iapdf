import { getHistory, getUsers } from "@/app/actions";
import TableHistory from "@/components/TableHistory";

export default async function history() {
  const [history, users] = await Promise.all([getHistory(), getUsers()]);
  if (!history || history.data.length === 0) {
    return (
      <div className="text-center text-gray-500">No history available.</div>
    );
  }

  if (!users) {
    return (
      <div className="text-center text-gray-500">
        An error occurred while obtaining users
      </div>
    );
  }

  return <TableHistory history={history.data || []} users={users} />;
}
