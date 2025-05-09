import Image from 'next/image';
import { ReactNode } from 'react';
import style from '@/styles/TableUserContainer.module.css'
import style2 from '@/styles/TableRoles.module.css'

type props = {
  onClick?: () => void;
  disabled?: boolean;
  src: string;
  alt: string;
  iconSize?: number;
  children: ReactNode;
}

export default function ButtonAddUser({ onClick, src, alt, iconSize, children }: props) {
  return (
    <button onClick={onClick} className={`${style.btnAddUser} ${style2.btnAddRol} `}>
      <Image 
        src={src} 
        alt={alt} 
        width={iconSize} 
        height={iconSize}
      />
      {children}
    </button>
  );
};
