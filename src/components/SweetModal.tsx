'use client'; // Necesario para usar useRouter

import { useEffect } from 'react';
import Swal from 'sweetalert2';

type Props = {
  evento: string;
  show: boolean;
  onClose?: () => void;
}

export default function SweetModal({ evento, show = false, onClose }: Props) {
    useEffect(() => {
      const showModal = async () => {
        if (!show) return;
  
        await Swal.fire({
          title: `${evento} successfully created!`,
          iconHtml: '<img src="/Suscessfull.png" alt="ok" style="width: 64px;"/>',
          backdrop: '#000000B5',
          showCloseButton: true,
          customClass: {
            icon: 'no-default-icon',
            popup: 'custom-modal-size',
            confirmButton: 'custom-ok-button',
            title: 'custom-title',
          },
          draggable: true,
        });
  
        // Llamamos a onClose cuando el modal se cierre
        if (onClose) onClose();
      };
  
      showModal(); // Ejecutamos la función asíncrona
    }, [show, evento, onClose]); // Dependencia para que se ejecute correctamente
  
    return null; 
  }