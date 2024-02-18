"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface CustomCheckBoxProps {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}
const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({
  id,
  label,
  disabled,
  register,
}) => {
  return (
    <div className="w-full flex flex-row gap-2 items-center">
      <input
        id={id}
        {...register(id)}
        type="checkbox"
        disabled={disabled}
        placeholder=""
        className="cursor-pointer"
      />
      <label className="font-medium cursor-pointer" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default CustomCheckBox;
