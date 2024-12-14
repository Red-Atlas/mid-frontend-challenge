type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode | React.ReactNode[];
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function Button({ children, onClick, disabled, style }: ButtonProps) {
  return (
    <button
      type={`${onClick ? "button" : "submit"}`}
      className={`px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 ${
        disabled && "opacity-50 cursor-not-allowed"
      }}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.Text = function Text({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <p className="text-gray-700" style={style}>
      {children}
    </p>
  );
};
