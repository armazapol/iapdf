
import TableUsers from '@/components/TableUsers'
import style from '@/styles/TableUserContainer.module.css'

export default function User() {

  return (
    <div className={style.tableContainer}>
         <TableUsers />
    </div>
  )
}
