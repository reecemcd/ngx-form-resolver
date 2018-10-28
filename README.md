# NGX Form Resolver

##### A simple library for mapping classes to FormGroups with reusable resolver functions.



## Table of Contents

* [Installation](#installation)
* [Quick Start](#quick-start)
* [API](#api)
* [Form Resolver Concept](#form-resolver-concept)
* [Form Control Resolver Concept](#form-control-resolver-concept)
* [Further Examples](#further-examples)



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

2.) A FormResolver is designed to map a defined class/object to a certain `FormGroup`. We will use a basic `Car` class in this example.

```TypeScript
export class Car {
    make: string = '';
    model: string = '';
    year: number = null;
    color: string = '';
}
```

3.) Inject the `FormResolverBuilder` into a component:

```TypeScript
@Component({...})
export class CarFormComponent {
    constructor(private FormResolverBuilder, ...) {...}
}
```

4.) Define your forms `FormGroup`:
```Typescript
this.carFormGroup = formBuilder.group({
    'make': [''],
    'model': [''],
    'year': [null]
});
```

5.) Build your `FormResolver<Car>`:
```Typescript
this.carFormResolver = this.formResolverBuilder
    .setFactory(() => new Car())
    .setFormGroup(this.carFormGroup)
    .setResolvers({
        'make': FormControlResolvers.simple,
        'model': FormControlResolvers.simple,
        'year': FormControlResolvers.simpleNumber
    })
    .build();
```

6.) Subscribe to changes:
```Typescript
this.carFormResolver.getFormState()
    .pipe(...)
    .subscribe(...)
```

## API

### FormResolverBuilder

Service used to build a `FormResolver`.

* `setFactory(factory: Function)`
* `setFormGroup(formGroup: FormGroup)`
* `setResolvers(resolverConfig: { [key: string]: FormControlResolver<any> })` 
* `build()`

### FormResolver

* `setFormState(object: T)`
* `getFormState(): Observable<T>`
* `getFormStateSnapshot(): T`
* `updateFormGroup(formGroup: FormGroup)`
* `updateFactory(factory: Function)`
* `updateResolverConfig(resolverConfig: { [key: string]: FormControlResolver<any> })`
* `addControl(controlName: string, formControlResolver: FormControlResolver<any>)`
* `removeControl(controlName: string)`
* `complete()`

### FormControlResolver

FormControlResolver type definition:

```Typescript
class FormControlResolver<T> {
    inputResolver: InputResolver<T>;
    outputResolver: OutputResolver<T>;
}
```
```Typescript
type InputResolver<T> = (inputObject: T, controlName?: string) => any;
```
```Typescript
type OutputResolver<T> = (outputObject: T, formValues: any, controlName?: string) => T;
```

Included FormControlResolvers:
* `FormControlResolvers.simple`: 
    * Used for directly mapping the value of a `FormControl` to a prop of the same name
* `FormControlResolvers.simpleNumber`: 
    * The `simple` formControlResolver except the output value is cast as a number
* `FormControlResolvers.simpleString`: 
    * The `simple` formControlResolver except the output value is cast as a string



## Form Resolver Concept

A `FormResolver<T>` maps values **to a `FormGroup` from an instance of `T`** *and* **to an instance of `T` from a `FormGroup`**. A `FormResolver` is built from the three items below using the `FormResolverBuilder` service:

* **Factory**: The base object a `FormResolver` will use to map form state to. Ultimately, the result of this factory is the base object a `FormGroup`'s state will be resolved into.

* **FormGroup**: The `FormGroup` a `FormResolver` will be mapping to and from.

* **ResolverConfig**: A config used to map specific `FormControl`s to `FormControlResolver`s using formControlNames (see below).

Each of these items can be changed at any time using the provided API methods. After building a `FormResolver` the state of the form can be accessed directly as a snapshot or overtime as an observable.

## Form Control Resolver Concept

### Input/Output Resolvers

A `FormControlResolver` is a pair of functions used to map one form control to and from the target object class. The `InputResolver` function maps an object to a form and an `OutputResolver` function maps a form control value to an object.

An `InputResolver` is passed the object being mapped and the name of the control the resolver is trying to map it to. The return value of this function is the value that the FormControl will be set to.

An `OutputResolver` is passed the object being mapped, the full list of values in the formGroup, and the name of the control that needs to be mapped to the object.

### Form Control Resolvers & Parameters

There are a few default simple FormControlResolvers that are exported under `FormControlResolvers`. These FormControlResolvers let you easily map form control values directly to object properties of the same name.

You can also pass parameters to your own FormControlResolvers by wrapping them in a function that returns your `FormControlResolver`. See below or in the examples section for a more in depth look:
```Typescript
const exampleControlResolver = (value: string) => new FormControlResolver(
    (inputObj: any, controlName: string) => { ... },
    (outputObj: any, formValues: any, controlName: string) => { ... }
)
```

## Further Examples

See the examples below for full implementations of some concepts listed above: 

* Basic Form Resolver
* Dynamic Form Resolver
* Custom Form Resolver
* Form Control Resolver w/ Parameters