import style from '@/styles/TableUserContainer.module.css'
import TableUsers from '@/components/TableUsers';

export default function usermanagement() {
    return (
      <div className={style.tableContainer}>
        <TableUsers />
      </div>
    );
  }