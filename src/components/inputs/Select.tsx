import { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
};

export function Select(props: SelectProps) {
  const { label, error, value, onChange, options, disabled, ...rest } = props;

  return (
    <div className="relative">
      <label className="block text-sm text-gray-500">{label}</label>

      <select
        value={value}
        onChange={onChange}
        className={`block mt-2 w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700  focus:outline-none focus:ring  focus:ring-opacity-40    
         ${
           error && "   border-red-400  focus:border-red-400 focus:ring-red-300"
         }
         ${disabled && "bg-gray-200 cursor-not-allowed"}
         `}
        {...rest}
      >
        {options.map((option: { value: string; label: string }) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-xs text-red-400 absolute">{error}</p>}
    </div>
  );
}
