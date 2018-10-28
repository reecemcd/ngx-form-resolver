import { FormControlResolver } from "ngx-form-resolver";

export const replaceSpacesControlResolver = (value: string) => new FormControlResolver(
    (inputObj: any, controlName: string) => {
        return inputObj.replace(new RegExp(value, 'g'), ' ');
    },
    (outputObj: any, formValues: any, controlName: string) => {
        if (formValues.hasOwnProperty(controlName)) {
            outputObj = formValues[controlName].replace(/ /g, value);
        }
        return outputObj;
    }
)