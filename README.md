<h1 align="center">NGX Form Resolver</h1>

<p align="center">
A simple library for mapping objects to Angular FormGroups with reusable resolver functions.
</p>

<p align="center">
    <a href="https://badge.fury.io/js/ngx-form-resolver" target="_blank"><img src="https://badge.fury.io/js/ngx-form-resolver.svg" alt="npm version" height="18"></a>
    <a href="https://npmjs.org/ngx-form-resolver" target="_blank"><img src="https://img.shields.io/npm/dt/ngx-form-resolver.svg" alt="npm downloads" ></a>
    <a href="https://github.com/reecemcd/ngx-form-resolver/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="mit license" height="18"></a>
    <a href="https://circleci.com/gh/reecemcd/ngx-form-resolver" target="_blank"><img src="https://circleci.com/gh/reecemcd/ngx-form-resolver.svg?style=svg" alt="mit license" height="18"></a>
</p>

---

## Links

* 🏃 [Demo Site w/ Examples](https://reecemcd.github.io/ngx-form-resolver)
* ⚡ [Stackblitz Interactive Example](https://stackblitz.com/edit/ngx-form-resolver-simple)
* 🗄 [Changelog](https://github.com/reecemcd/ngx-form-resolver/blob/master/CHANGELOG.md)



## Table of Contents

* [Installation](#installation)
* [Quick Start](#quick-start)
* [API](#api)
* [Form Resolver Concept](#form-resolver-concept)
* [Form Control Resolver Concept](#form-control-resolver-concept)



## Installation

`npm install ngx-form-resolver --save`



## Quick Start

1.) Import the `FormResolverModule`:

```TypeScript
@NgModule({
    ...
    imports: 
        ...
        FormResolverModule.forRoot(),
    ]
    ...
})
```

2.) Inject the `FormResolverBuilder` (and `FormBuilder`):

```TypeScript
@Component({...})
export class CarFormComponent {
    constructor(private FormResolverBuilder: FormResolverBuilder, private formBuilder: FormBuilder ...) {...}
}
```

3.) A FormResolver is designed to map a defined class/object to a certain `FormGroup`. A basic `Car` class and `FormGroup` will be used in this example.

```TypeScript
export class Car {
    make: string = '';
    model: string = '';
    year: number = null;
    packages = {
        sport: false
    }
}
```
```TypeScript
this.carFormGroup = formBuilder.group({
    'make': [''],
    'model': [''],
    'year': [null],
    'sportPackageCheckbox': [false]
});
```

4.) Build a `FormResolver<Car>` with the class and FormGroup:
```Typescript
this.carFormResolver = this.formResolverBuilder
    .setFactory(() => new Car())
    .setFormGroup(this.carFormGroup)
    .setResolvers({
        'make': FormControlResolvers.simple,
        'model': FormControlResolvers.simple,
        'year': FormControlResolvers.simpleNumber,
        'sportPackageCheckbox': FormControlResolvers.nested('packages.sport')
    })
    .build();
```

5.) Subscribe to changes via observable:
```Typescript
this.carFormResolver.getFormState()
    .pipe(...)
    .subscribe((car: Car) => {...})
```

6.) Set the value of the form state on demand:
```Typescript
this.carFormResolver.setFormState({
        make: 'Ford';
        model: 'Escape';
        year: 2018;
    } as Car);
```

7.) Finally, complete OnDestroy:
```Typescript
ngOnDestroy() {
    this.carFormResolver.complete();
}
```


## API

### FormResolverBuilder

Service used to build a `FormResolver`.

* `setFactory(factory: Function)`
* `setFormGroup(formGroup: FormGroup)`
* `setResolvers(resolverConfig: { [key: string]: FormControlResolver<any> })` 
* `build()`

### FormResolver

| Method | Description |
|--------|-------------|
| `setFormState(object: T)` | pass an object to resolve to the form state |
| `getFormState(): Observable<T>` | get an observable that returns the resolved form state as an object whenever changes occur |
| `getFormStateSnapshot(): T` | get the current resolved form state object | set a new FormGroup to watch |
| `updateFactory(factory: Function)` | set a new factory function |
| `updateResolverConfig(resolverConfig: { [key: string]: FormControlResolver<any> })` | pass in a completely new config of formControlNames and resolvers |
| `addControl(controlName: string, formControlResolver: FormControlResolver<any>)` | adds a control to be watched and resolved |
| `updateControl(controlName: string, formControlResolver: FormControlResolver<any>)` | alias to addControl |
| `removeControl(controlName: string)` | removes a control from being watched and resolved |
| `complete()` | completes all form resolver subjects |

### FormControlResolver

FormControlResolver type definition:

```Typescript
class FormControlResolver<T> {
    inputResolver: InputResolver<T>;
    outputResolver: OutputResolver<T>;
    ...
}
```
```Typescript
type InputResolver<T> = (inputObject: T, controlName?: string) => any;
```
```Typescript
type OutputResolver<T> = (outputObject: T, formValues: any, controlName?: string) => T;
```

Included default FormControlResolvers:

| Resolver | Description |
|----------|-------------|
| `FormControlResolvers.simple` | Used for directly mapping the value of a `FormControl` to a prop of the same name |
| `FormControlResolvers.simpleNumber` | The `simple` formControlResolver except the input & output values are cast as a number |
| `FormControlResolvers.simpleString` | The `simple` formControlResolver except the input & output values are cast as a string |
| `FormControlResolvers.nested(propertyPath: string \| string[])` | Used for mapping the value of a `FormControl` to a nested prop using a `.` notated string or array of prop strings |
| `FormControlResolvers.nestedNumber(propertyPath: string \| string[])` | The `nested` formControlResolver except the input & output values are cast as a number |
| `FormControlResolvers.nestedString(propertyPath: string \| string[])` | The `nested` formControlResolver except the input & output values are cast as a string |

## Form Resolver Concept

A `FormResolver<T>` maps values **to a `FormGroup` from an instance of `T`** *and* **to an instance of `T` from a `FormGroup`**. A `FormResolver` is a configuration of `FormControlResolver`s that define and abstract away control value mapping. Once configured, a `FormResolver` serves as an adapter between your class/object and `FormGroup`. A `FormResolver` is built from the three items below using the `FormResolverBuilder` service:

* **Factory**: The base object a `FormResolver` will use to map form state to. Ultimately, the result of this factory is the base object a `FormGroup`'s state will be resolved into.

* **FormGroup**: The `FormGroup` a `FormResolver` will be mapping to and from.

* **ResolverConfig**: A config used to map specific `FormControl`s to `FormControlResolver`s using formControlNames (see [below](#form-control-resolver-concept)).

Each of these items can be changed at any time using the provided API methods. After building a `FormResolver` the state of the form can be accessed directly as a snapshot or over time as an observable. The state can also be set using an object or instance of the defined class.

#### TIPS:
* When passed a `null` value, a `FormResolver` will reset the target mapped control
* `FormResolver`s work with nested `FormGroups` - both the parent group or any of the child groups.
* Setting properties that are not in your form in your factory's return object will ensure the output form state contains those values (useful when you need keep the values of props not in your form)



## Form Control Resolver Concept

### Input/Output Resolvers

A `FormControlResolver` is a reusable, easily testable pair of functions used to map one form control to and from the target object/class. An `InputResolver` function maps an object to a form and an `OutputResolver` function maps a form control value to an object.

An `InputResolver` is passed the object being mapped and the name of the control the resolver is trying to map it to. The return value of this function is the value that the target FormControl will be set to.

An `OutputResolver` is passed the object being mapped, the full list of values in the formGroup, and the name of the control that needs to be mapped to the object.

### Default Form Control Resolvers

There are a few default simple FormControlResolvers that are exported under `FormControlResolvers` (see [API](#api)). These FormControlResolvers let you easily map form control values directly to object properties of the same name.

#### TIPS:
* It can sometimes be useful to create custom a FormControlResolver factory by wrapping it in a function that returns a `FormControlResolver`. See the example below:
```Typescript
const exampleControlResolverFactory = (value: any) => new FormControlResolver(
    (inputObject: any, controlName: string) => { ... },
    (outputObject: any, formValues: any, controlName: string) => { ... }
)
```