'use client';


import TableRoles from '@/components/TableRoles';
import { useLoading } from '@/components/providers/LoadingProvider';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Roles() {

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
              <TableRoles entity='Role' />
            </div>
          )
      )
    );
  }