import { FormControlResolver } from "./form-resolver.models";

export const FormControlResolvers = {

  // Maps a prop and a form control 1-to-1
  simple: new FormControlResolver(
    (inputObj: any, controlName: string) => {
      if (inputObj.hasOwnProperty(controlName)) {
        return inputObj[controlName];
      }
    },
    (outputObj: any, formValues: any, controlName: string) => {
      if (formValues.hasOwnProperty(controlName)) {
        outputObj[controlName] = formValues[controlName];
      }
      return outputObj;
    }
  ),

  // Maps a prop and a form control 1-to-1 but returns the resulting value as a number
  simpleNumber: new FormControlResolver(
    (inputObj: any, controlName: string) => {
      if (inputObj.hasOwnProperty(controlName)) {
        return (inputObj[controlName] !== null) ? inputObj[controlName] + '' : null;
      }
    },
    (outputObj: any, formValues: any, controlName: string) => {
      if (formValues.hasOwnProperty(controlName)) {
        outputObj[controlName] = Number(formValues[controlName]);
      }
      return outputObj;
    }
  ),

  // Maps a prop and a form control 1-to-1 but returns the resulting value as a string
  simpleString: new FormControlResolver(
    (inputObj: any, controlName: string) => {
      if (inputObj.hasOwnProperty(controlName)) {
        return (inputObj[controlName] !== null) ? inputObj[controlName] + '' : null;
      }
    },
    (outputObj: any, formValues: any, controlName: string) => {
      if (formValues.hasOwnProperty(controlName)) {
        outputObj[controlName] = formValues[controlName] + '';
      }
      return outputObj;
    }
  )

};
