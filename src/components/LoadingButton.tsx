'use client';

import { useState } from 'react';
import styles from '@/styles/LoadingButton.module.css'
import Image from 'next/image';

export default function MyButton () {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);  // Inicia el estado de carga

    // Tiempo
    setTimeout(() => {
      setIsLoading(false);  
      setIsSuccess(true);   
    }, 1000);
  };

  return (
    <button
    className={`${styles.button} ${isLoading ? styles.buttonLoading : ''} ${isSuccess ? styles.buttonSuccess : ''}`}
    onClick={handleClick}
    disabled={isLoading || isSuccess }  // Deshabilita el botón mientras carga
    >
        {!isLoading && (
        <Image 
          src="/img/btnRetry.png" 
          alt="Retry" 
          width={16} 
          height={16} 
        />
        )}      
        {isLoading ? (
        <div className={styles.spinner}></div> // Muestra el spinner cuando está cargando
        ) : isSuccess ? (
        <span className={styles.Success}>Success</span> // Muestra "Success" cuando el proceso termina
        ) : (
        'Retry'
        )}
   </button>

    
  );
};

