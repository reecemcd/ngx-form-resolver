export type InputResolver<T> = (inputObject: T, controlName?: string) => any;
export type OutputResolver<T> = (outputObject: T, formValues: any, controlName?: string) => T;

export class FormControlResolver<T> {
  inputResolver: InputResolver<T>;
  outputResolver: OutputResolver<T>;

  constructor(
    inputResolver: InputResolver<T>,
    outputResolver: OutputResolver<T>
  ) {
    this.inputResolver = inputResolver;
    this.outputResolver = outputResolver;
  }
}