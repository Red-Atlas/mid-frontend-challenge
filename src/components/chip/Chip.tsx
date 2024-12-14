type ChipProps = {
  children: React.ReactNode | React.ReactNode[];
};

export function Chip({ children }: ChipProps) {
  return (
    <h3 className="text-xs m-auto p-2 bg-white rounded-md text-center">
      {children}
    </h3>
  );
}

Chip.Label = function ChipLabel({ label }: { label: string }) {
  return <strong>{label}</strong>;
};

Chip.Text = function ChipText({ text }: { text: string }) {
  return text;
};
