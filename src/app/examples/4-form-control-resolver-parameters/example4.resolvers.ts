import { NestedExampleClass } from './../example.models';
import { FormControlResolver } from 'ngx-form-resolver';

export const replaceSpacesControlResolver = (value: string) => new FormControlResolver(
    (inputObj: NestedExampleClass, controlName: string) => {
        return inputObj.encodedMessage.replace(new RegExp(value, 'g'), ' ');
    },
    (outputObj: NestedExampleClass, formValues: any, controlName: string) => {
        if (formValues.hasOwnProperty(controlName)) {
            outputObj.encodedMessage = formValues[controlName].replace(/ /g, value);
        }
        return outputObj;
    }
);