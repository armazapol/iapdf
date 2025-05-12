'use client';

import { useLoading } from '@/components/providers/LoadingProvider';
import style from '@/styles/Loader.module.css'; 

export const Loader = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className={style.overlay}>
      <div className={style.spinner}></div>
    </div>
  );
};