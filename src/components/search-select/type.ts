export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export type SelectValue<T extends SelectOption = SelectOption> = string | number | T | Array<SelectValue<T>>;
