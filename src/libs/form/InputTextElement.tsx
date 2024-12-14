import { Control, Controller, Path } from "react-hook-form";
import { InputText } from "../../components/inputs";

import { FieldValues } from "react-hook-form";

type InputTextElementProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  disabled?: boolean;
};

export function InputTextElement<T extends FieldValues>(
  props: InputTextElementProps<T>
) {
  const { control, name, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <InputText
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
          {...rest}
        />
      )}
    />
  );
}
