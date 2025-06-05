import React from "react";
type Props = {
  checked: boolean;
  onChange: (value: boolean) => void;
};
export default function ToggleSwitch({ checked, onChange }: Props) {
  return (
    <label className="relative inline-block w-[50px] h-[25px]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      {/* FONDO DEL SLIDER */}
      <div className="w-full h-full bg-[#D1D1D6] rounded-[34px] transition peer-checked:bg-[#B32646]" />
      {/* CÍRCULO */}
      <div className="absolute top-[2px] left-[3px] h-[20px] w-[20px] bg-white rounded-full transition peer-checked:translate-x-[26px] cursor-pointer" />
    </label>
  );
}