import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Select } from "../../components/inputs";

type SelectElementProps<T extends FieldValues> = {
  control: Control<T>;

  name: Path<T>;
  label: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
};

export function SelectElement<T extends FieldValues>(
  props: SelectElementProps<T>
) {
  const { control, name, options, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Select
          value={field.value}
          onChange={field.onChange}
          options={options}
          error={fieldState.error?.message}
          {...rest}
        />
      )}
    />
  );
}
