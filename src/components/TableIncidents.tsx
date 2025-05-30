"use-client";

import style from "@/styles/TableIncidents.module.css";
import LoadingButton from "@/components/LoadingButton";

interface Indicent {
  id: string;
  nombre: string;
  timestamp: string;
  actividad: string;
}

export default function TableIncidents({
  incidents,
}: {
  incidents: Indicent[];
}) {
  console.log("TableIncidents: ", incidents);

  return (
    <div className={`${style.container} mt-4 lg:mt-0`}>
      <table className={style.TableIncidents}>
        <thead className={style.thead}>
          <tr>
            <th>No.</th>
            <th>Service</th>
            <th>Title</th>
            <th>Time</th>
            <th>Activity</th>
            <th className={style.action}>Action</th>
          </tr>
        </thead>
        <tbody className={style.tbody}>
          {incidents.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">
                No incidents found
              </td>
            </tr>
          )}
          {incidents.map((info, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className={style.service}>{info.id}</td>
              <td className={style.titleColumn}>{info.nombre}</td>
              <td>{info.timestamp}</td>
              <td>
                <span className={style.tdName}>{info.actividad}</span>
                {/* <span className={style.tdName}>{info.Activity.name}</span>
                            <span> {info.Activity.for} </span>
                            <span className={style.tdDuration}>{info.Activity.duration} </span>
                            <span>{info.Activity.source}</span> */}
              </td>
              <td>
                <LoadingButton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
