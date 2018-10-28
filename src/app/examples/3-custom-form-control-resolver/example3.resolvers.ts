import { FormControlResolver } from "ngx-form-resolver";
import { FooBarBaz } from "../example.models";

export const FooBarControlResolver = new FormControlResolver(
    (inputObj: FooBarBaz, controlName: string) => {
        return inputObj.merged.foobar.replace(inputObj.foo, '');
    },
    (outputObj: FooBarBaz, formValues: any, controlName: string) => {
        if (formValues.hasOwnProperty('foo') && formValues.hasOwnProperty('bar')) {
            outputObj.merged.foobar = formValues['foo'] + formValues['bar'];
        }
        return outputObj;
    }
);

export const FooBazControlResolver = new FormControlResolver(
    (inputObj: FooBarBaz, controlName: string) => {
        return inputObj.merged.foobaz.replace(inputObj.foo, '');
    },
    (outputObj: FooBarBaz, formValues: any, controlName: string) => {
        if (formValues.hasOwnProperty('foo') && formValues.hasOwnProperty('baz')) {
            outputObj.merged.foobaz = formValues['foo'] + formValues['baz'];
        }
        return outputObj;
    }
);