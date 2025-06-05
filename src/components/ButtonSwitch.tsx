import React from 'react';
import styles from '@/styles/TableUserContainer.module.css'; 

type Props = {
  checked: boolean;
  onChange: () => void;
};

export default function ToggleSwitch ({ checked, onChange}: Props)  {
  return (
    <label className={styles.switch}>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange} 
      />
      <span className={styles.slider}></span>
    </label>
  );
};
