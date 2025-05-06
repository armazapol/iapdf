import { Switch } from "@chakra-ui/react";
import { useState } from "react";

export default function Chakraui() {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);  // Toggle el estado
  };

  return (
    <div>
      <Switch
        isChecked={isChecked}      // Valor controlado
        onChange={handleToggle}    // Cambia el estado
        colorScheme="teal"         // Estilo del switch
      />    
    </div>
  );
}