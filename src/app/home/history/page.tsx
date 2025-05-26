
import { getHistory } from "@/app/actions"
import TableHistory from "@/components/TableHistory"

export default async function history () {
  const history = await getHistory()
  return (
    <div>
      <TableHistory history={history}></TableHistory>
    </div>
  )
}
