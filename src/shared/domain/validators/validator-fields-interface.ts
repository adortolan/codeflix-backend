export type FieldsErros = {
  [field: string]: string[];
};

export interface IValidatorFields<PropsValidated> {
  erros: FieldsErros | null;
  validadedData: PropsValidated | null;
  validate(data: any): boolean;
}
