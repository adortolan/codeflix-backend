import { FieldsErros } from "./validator-fields-interface";

export class ValidationErro extends Error {}

export class EntityValidationError extends Error {
  constructor(public error: FieldsErros, message = "Validation Error") {
    super(message);
  }

  count() {
    return Object.keys(this.error).length;
  }
}
