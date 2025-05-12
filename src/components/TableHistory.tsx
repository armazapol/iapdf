
import React from 'react'
import style from '@/styles/HistoryContainer.module.css'
import Image from 'next/image'

export default function TableHistory() {

  const history = [
    {Nro: 1, DateSubmited: "04/18/2025", TotalFiles: 20, status: "queued"},
    {Nro: 2, DateSubmited: "04/18/2025", TotalFiles: 20, status: "Converted"},
    {Nro: 3, DateSubmited: "04/18/2025", TotalFiles: 20, status: "Converted"},
    {Nro: 4, DateSubmited: "04/18/2025", TotalFiles: 20, status: "Converted"},
    {Nro: 5, DateSubmited: "04/18/2025", TotalFiles: 20, status: "Converted"},
    {Nro: 6, DateSubmited: "04/18/2025", TotalFiles: 20, status: "Converted"}
  ]
   
  const pagination = [1,2,3,4]

  return (
    <div className={style.historyContainer}>
        <div>
            <input type="date" />
            <input type="text" />
        </div>
        <table className={style.TableHistory}>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Date submited</th>
                    <th>Total files converted</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
               { history.map(item =>(
                <tr key={item.Nro}>
                    <td>{item.Nro}</td>
                    <td>{item.DateSubmited}</td>
                    <td>{item.TotalFiles}</td>
                    <td className={style.vectorOn}><Image src='/img/VectorOn.png' width={18} height={4} alt='vectorOn' />{item.status}</td>
                    <td className={style.btnContainer}>
                        <button><Image src='/img/eyeWhite.png' width={18} height={18} alt='eye'/> View Files</button>
                    </td>
                </tr>
               ))}
            </tbody>
        </table>
        <div className={style.paginationContainer}>
            {pagination.map( (key, pagina) => (
                <button key={key}>{pagina+1}</button>
            ))}
            <button>
                {/* <Image src='' width={18} height={4} alt=''/> */}
            </button>
            <button>
                {/* <Image src='' width={8} height={4} alt=''/> */}
            </button>
        </div>
    </div>
  )
}
