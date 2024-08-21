import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface ToggleProps {
  defaultValue?: boolean;
  onChange: (isChecked: boolean) => void;
  trueLabel?: string;
  falseLabel?: string;
}

const Toggle = ({
  defaultValue = false,
  onChange,
  trueLabel,
  falseLabel,
}: ToggleProps) => {
  const [isChecked, setIsChecked] = useState(defaultValue);

  // Toggle the isChecked state whenever the checkbox is clicked
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Call the onChange function whenever the isChecked state changes
  useEffect(() => {
    onChange(isChecked);
  }, [isChecked, onChange]);

  return (
    <label className="h-full shadow border rounded-lg relative inline-flex cursor-pointer select-none items-center justify-center bg-white p-1">
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span
        className={twMerge(
          "flex items-center rounded h-full px-4 text-sm font-medium",
          !isChecked && "bg-slate-100",
        )}
      >
        {falseLabel}
      </span>
      <span
        className={twMerge(
          "flex items-center rounded h-full px-4 text-sm font-medium",
          isChecked && "bg-slate-100",
        )}
      >
        {trueLabel}
      </span>
    </label>
  );
};

export default Toggle;
