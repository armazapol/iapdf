'use client';

import { useState } from 'react';
import styles from '@/styles/LoadingButton.module.css'
import Image from 'next/image';

//import { useRouter } from 'next/navigation';

export default function LoadingButton () {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // const router = useRouter()

  const handleClick = async () => {
    setIsLoading(true);  // Inicia el estado de carga

    // Tiempo
    setTimeout(() => {
      setIsLoading(false);  
      setIsSuccess(true);
      
      // router.push('/home');
    }, 1000);
  };

  return (
    <button
    className={`${styles.button} ${isLoading ? styles.buttonLoading : ''} ${isSuccess ? styles.buttonSuccess : ''}`}
    onClick={handleClick}
    disabled={isLoading || isSuccess }  // Deshabilita el botón mientras carga
    >
        {(isLoading || !isSuccess) && (
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
          <div className={styles.succesContainer}>
            <span className={styles.Success}>Success</span> 
            <a href=""></a>
          </div>
        ) : (
        'Retry'
        )}
   </button>

    
  );
};

