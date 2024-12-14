import { InputTextElement, SelectElement } from "../../libs/form";
import { Button } from "../button/Button";
import { INPUTS, SELECTS } from "./mocks";

type FormProps = {
  isLoading: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
};

export function Form(props: FormProps) {
  const { isLoading, onSubmit, control } = props;

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4"
    >
      {INPUTS.map((input) => (
        <InputTextElement
          key={input.name}
          control={control}
          name={input.name as never}
          label={input.label}
          placeholder={input.placeholder}
          disabled={isLoading}
        />
      ))}

      {SELECTS.map((select) => (
        <SelectElement
          key={select.name}
          control={control}
          name={select.name as never}
          label={select.label}
          options={select.options}
          disabled={isLoading}
        />
      ))}

      <Button disabled={isLoading} className="mt-4 sm:mt-0">
        Guardar
      </Button>
    </form>
  );
}
