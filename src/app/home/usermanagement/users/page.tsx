'use client';

import RolForm from '@/components/RolForm';
import TableRoles from '@/components/TableRoles';
import TableUsers from '@/components/TableUsers';
import { useLoading } from '@/components/providers/LoadingProvider';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Users() {
    

      // const res = await fetch('https://tu-api.com/roles', {
      //   cache: 'no-store' //
      // });

      // if (!res.ok) {
      //   throw new Error('Error al cargar roles');
      // }

      // const users = await res.json();

    const { loading, setLoading } = useLoading();
      useEffect(() => {
        setLoading(true);
          // Simula carga
        setTimeout(() => setLoading(false), 1000);
    },[]);

    return (
      ( loading ? (
          <Skeleton height="504px" width="100%" /> 
          ) : (
            <div>
              <TableUsers  entity="user" />
            </div>
          )
      )
    );
  }