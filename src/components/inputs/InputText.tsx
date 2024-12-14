import { InputHTMLAttributes } from "react";

type InputTextProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  placeholder?: string;
  error?: string;
  value?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputText(props: InputTextProps) {
  const { label, placeholder, error, value, disabled, onChange, ...rest } =
    props;

  return (
    <div className="relative">
      <label className="block text-sm text-gray-500">{label}</label>

      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        className={`block mt-2 w-full placeholder-gray-400/70 rounded-lg border bg-white px-5 py-2.5 text-gray-700  focus:outline-none focus:ring  focus:ring-opacity-40    
         ${
           error && "border-red-400  focus:border-red-400 focus:ring-red-300"
         } ${disabled && "bg-gray-200 cursor-not-allowed"}`}
        {...rest}
      />

      {error && <p className="mt-1 text-xs text-red-400 absolute">{error}</p>}
    </div>
  );
}
