'use client'; 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import style from '@/styles/TableUserContainer.module.css'


export default function TableUsers() {
  //const [users, setUsers] = useState([]);
  const router = useRouter();
  
  const [users, setUsers] = useState([
    {
      id: "1",
      author: { name: "Angelica Jose", email: "esthera@simmple.com" , img: "/image.png" },
      function: 'Administrador',
      fechaInicio: '06/14/25',
      fechaModification: '07/13/25',
      active: true,
    },
    {
      id: "2",
      author: { name: "Alexa Lliras", email: "alexa@simmple.com" , img: "/image.png" },
      function: 'Worker',
      fechaInicio: '06/14/25',
      fechaModification: '07/13/25',
      active: false,
    },
    {
      id: "3",
      author: { name: "Laurent Michael", email: "Laurent@simmple.com" , img: "/image.png" },
      function: 'Worker',
      fechaInicio: '06/14/25',
      fechaModification: '07/13/25',
      active: true,
    },
    {
      id: "4",
      author: { name: "Freaduardo Hill", email: "freduardo@simmple.com" , img: "/image.png" },
      function: 'Worker',
      fechaInicio: '06/14/25',
      fechaModification: '07/13/25',
      active: true,
    },
    {
      id: "5",
      author: { name: "Daniel Thomas", email: "daniel@simmple.com" , img: "/image.png" },
      function: 'Worker',
      fechaInicio: '06/14/25',
      fechaModification: '07/13/25',
      active: true,
    },
    {
      id: "6",
      author: { name: "Mark wilson", email: "mark@simmple.com" , img: "/image.png" },
      function: 'Worker',
      fechaInicio: '06/14/25',
      fechaModification: '07/13/25',
      active: true,
    },
    
  ]);

  const toggleUserActive = (id:string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };
  
  const handleEdit = () => {
    router.push(`/home/usermanagement/edit`)
  }
  const handleNewUser = () => {
    router.push('/home/usermanagement/new')
  }

//   useEffect(() => {
//     // Aquí ira la llamada a la API real
//     async function fetchUsers() {
//       const res = await fetch('/api/users'); // Ajustar ruta
//       const data = await res.json();
//       setUsers(data);
//     }

//     fetchUsers();
//   }, []);

  return (
    <div className={style.tableUserContainer}>
      <div className={style.header}>
        <p>User table</p>
        <button onClick={handleNewUser} > 
          <Image 
          src="/user-profile-add.png" 
          alt='Add user'
          width={18}
          height={18}
          /> 
          New Users
        </button>
      </div>
      <table className={style.tableUser}>
        <thead>
          <tr>
            <th>AUTHOR</th>
            <th>FUNCTION</th>
            <th>CREATION DATE</th>
            <th>MODIFICATION DATE</th>
            <th>ACTIVE USER?</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {users.map(user => (
          <tr key={user.id} className={style.rowUser}>
            <td>
              <div className={style.authorContainer}>
                <Image 
                  src={user.author.img}
                  alt={`Image user`}
                  width={40}
                  height={40}
                />
                <div>
                  <div className={style.author}>{user.author.name}</div>
                  <div className={style.email}>{user.author.email}</div>
                </div>
              </div>
            </td>
            <td>{user.function}</td>
            <td>{user.fechaInicio}</td>
            <td>{user.fechaModification}</td>
            <td>
               <label className="switch">
                  <input type="checkbox" id="toggle" checked={user.active} onChange={() => toggleUserActive(user.id)}  />
                  <span className="slider"></span>
                </label>
            </td>
            <td className={style.rowEdit}>
              <button onClick={()=> handleEdit()} >
                Edit
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}