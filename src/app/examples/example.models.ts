export class Car {
    make: string = '';
    model: string = '';
    year: number = 0;
    color: string = '';
}

export class FooBarBaz {
    foo: string = '';
    merged: { foobar: string, foobaz: string } = {
        foobar: '',
        foobaz: ''
    };
}

export class NestedExampleClass {
    encodedMessage: string = '';
    outer: { inner: { target: string } } = {
        inner: {
            target: ''
        }
    };
}