import { getIncidents } from "@/app/actions";
import TableIncidents from "@/components/TableIncidents";

export default async function IncidentsPage() {
  const incidents = await getIncidents();
  return (
    <>
      <TableIncidents
        incidents={incidents.length > 0 ? incidents : incidents.data}
      />
    </>
  );
}
