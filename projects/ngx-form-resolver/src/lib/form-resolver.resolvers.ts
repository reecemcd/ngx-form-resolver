import { FormControlResolver } from './form-resolver.models';

const getNestedPropValue = (obj, propPath, separator = '.') => {
  let pathList = Array.isArray(propPath) ? propPath : propPath.split(separator);
  return pathList.reduce((prev, curr) => prev && prev[curr], obj);
};

const setNestedPropValue = (obj, propPath, newValue, separator = '.') => {
  let pathList = Array.isArray(propPath) ? propPath : propPath.split(separator);
  pathList.reduce((prev, curr, index) => {
    if (index === pathList.length - 1 && prev && prev.hasOwnProperty(curr)) {
      prev[curr] = newValue;
      return false;
    }
    return (prev && prev[curr]);
  }, obj);
};

const castNumber = (value: any) => {
  if (typeof value === 'number') {
    return value;
  }
  else if (typeof value === 'string' && !isNaN(Number(value)) && value !== '') {
    return Number(value);
  }
  else {
    return null;
  }
};

export const FormControlResolvers: {
    simple: FormControlResolver<any>,
    simpleNumber: FormControlResolver<any>,
    simpleString: FormControlResolver<any>,
    nested: (propPath: string | string[]) => FormControlResolver<any>,
    nestedNumber: (propPath: string | string[]) => FormControlResolver<any>,
    nestedString: (propPath: string | string[]) => FormControlResolver<any>,
  } = {

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
        return (inputObj[controlName] !== null) ? castNumber(inputObj[controlName]) : null;
      }
    },
    (outputObj: any, formValues: any, controlName: string) => {
      if (formValues.hasOwnProperty(controlName)) {
        outputObj[controlName] = castNumber(formValues[controlName]);
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
  ),

  // Maps a nested prop to a form Control
  nested: (propPath: string | string[]) => new FormControlResolver(
    (inputObj: any, controlName: string) => {
      return getNestedPropValue(inputObj, propPath);
    },
    (outputObj: any, formValues: any, controlName: string) => {
      if (formValues.hasOwnProperty(controlName)) {
        setNestedPropValue(outputObj, propPath, formValues[controlName]);
      }
      return outputObj;
    }
  ),

  // Maps a nested prop to a form Control but returns the resulting value as a number
  nestedNumber: (propPath: string | string[]) => new FormControlResolver(
    (inputObj: any, controlName: string) => {
      let ret = getNestedPropValue(inputObj, propPath);
      return (ret !== null)
        ? (Number.isNaN(Number(ret)))
          ? undefined
          : castNumber(ret)
        : null;
    },
    (outputObj: any, formValues: any, controlName: string) => {
      if (formValues.hasOwnProperty(controlName)) {
        setNestedPropValue(outputObj, propPath, castNumber(formValues[controlName]));
      }
      return outputObj;
    }
  ),

  // Maps a nested prop to a form Control but returns the resulting value as a string
  nestedString: (propPath: string | string[]) => new FormControlResolver(
    (inputObj: any, controlName: string) => {
      let ret = getNestedPropValue(inputObj, propPath);
      return (ret !== null)
        ? (ret === undefined)
          ? undefined
          : ret + ''
        : null;
    },
    (outputObj: any, formValues: any, controlName: string) => {
      if (formValues.hasOwnProperty(controlName)) {
        setNestedPropValue(outputObj, propPath, formValues[controlName] + '');
      }
      return outputObj;
    }
  ),

};
