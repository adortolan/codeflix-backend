import { validateSync } from "class-validator";
import { FieldsErros, IValidatorFields } from "./validator-fields-interface";

export abstract class ClassValidatorFields<PropsValidated>
  implements IValidatorFields<PropsValidated>
{
  erros: FieldsErros | null = null;
  validadedData: PropsValidated;

  validate(data: any): boolean {
    const erros = validateSync(data);
    if (erros.length) {
      this.erros = {};
      for (const erro of erros) {
        const field = erro.property;
        this.erros[field] = Object.values(erro.constraints!);
      }
    } else {
      this.validadedData = data;
    }

    return !erros.length;
  }
}
