'use-client'

import style from '@/styles/TableIncidents.module.css'
import LoadingButton from '@/components/LoadingButton'

export default function TableIncidents() {

  const infos = [
    { 
        No: 1,
        Service: "AWS Infrastructure",
        Title: "[#199999] AWS Heidtui Event Us-east-1EBS:AWS_EBS_VOLUME_LOST",
        Time: "AT 7:34 pm",
        Activity: {
            name: "Jessica Tuter",
            for: "for",
            duration: "30 minutes",
            source: "through the API"
          }
    },
    { 
        No: 2,
        Service: "AWS Infrastructure",
        Title: "[#199999] AWS Heidtui Event Us-east-1EBS:AWS_EBS_VOLUME_LOSsT",
        Time: "AT 7:34 pm",
        Activity: {
            name: "Jessica Tuter",
            for: "for",
            duration: "30 minutes",
            source: "through the API"
          }
    },
    { 
        No: 3,
        Service: "AWS Infrastructure",
        Title: "[#199999] AWS Heidtui Event Us-east-1EBS:AWS_EBS_VOLUME_LOST",
        Time: "AT 7:34 pm",
        Activity: {
            name: "Jessica Tuter",
            for: "for",
            duration: "30 minutes",
            source: "through the API"
          }
    }
  ]

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
                {infos.map( info => ( 
                    <tr key={info.No}>
                        <td>{info.No}</td>
                        <td className={style.service}>{info.Service}</td>
                        <td  className={style.titleColumn}>{info.Title}</td>
                        <td>{info.Time}</td>
                        <td>
                            <span className={style.tdName}>{info.Activity.name}</span>
                            <span> {info.Activity.for} </span>
                            <span className={style.tdDuration}>{info.Activity.duration} </span>
                            <span>{info.Activity.source}</span>
                        </td>
                        <td>
                            <LoadingButton />
                        </td>
                    </tr>)
                )}
            </tbody>
        </table>
    </div>
  )
}
