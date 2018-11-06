import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
import { FormResolverBuilder } from './form-resolver-builder.service';
import { FormControlResolvers } from './form-resolver.resolvers';
import { FormResolver } from './form-resolver';

let testForm: FormGroup;
let testFormResolver: FormResolver<any>;

describe('FormResolverBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ FormBuilder ]
  }));

  beforeEach(() => {
    const service: FormResolverBuilder = TestBed.get(FormResolverBuilder);
    const fb: FormBuilder = TestBed.get(FormBuilder);

    testForm = fb.group({ 'foo': [1] });
    testFormResolver = service
      .setFactory(() => ({ foo: 0 }))
      .setFormGroup(testForm)
      .setResolvers({ 'foo': FormControlResolvers.simpleNumber })
      .build();
  });

  it('should be created', () => {
    expect(testFormResolver).toBeTruthy();
  });

  it('should get form state snapshot', () => {
    testFormResolver.setFormState({ foo: 2 });
    expect(testFormResolver.getFormStateSnapshot()).toBeDefined();
    expect(testFormResolver.getFormStateSnapshot().foo).toEqual(2);
  });

  it('should set form state', () => {
    testFormResolver.setFormState({ foo: 2 });
    expect(testFormResolver.getFormStateSnapshot().foo).toEqual(2);
    // setting a value to null should reset a control
    testFormResolver.setFormState({ foo: null });
    expect(testForm.get('foo').dirty).toBeFalsy();
  });

  it('should get form state', async(() => {
    testFormResolver.getFormState().subscribe(state => {
      expect(state.foo).toBeDefined();
      expect(state.foo).toEqual(2);
    });
    testFormResolver.setFormState({ foo: 2 });
  }));

  it('should update FormGroup', () => {
    const fb: FormBuilder = TestBed.get(FormBuilder);

    expect(testFormResolver.getFormStateSnapshot().foo).toEqual(1);
    testFormResolver.updateFormGroup(fb.group({ 'foo': [2] }));
    expect(testFormResolver.getFormStateSnapshot().foo).toEqual(2);
  });

  it('should update factory', () => {
    expect(testFormResolver.getFormStateSnapshot().bar).toBeUndefined();
    testFormResolver.updateFactory(() => ({ foo: 0, bar: 1 }));
    expect(testFormResolver.getFormStateSnapshot().bar).toEqual(1);
  });

  it('should update resolverConfig', () => {
    expect(testFormResolver.getFormStateSnapshot().foo).toEqual(1);
    testFormResolver.updateResolverConfig({ 'foo': FormControlResolvers.simpleString });
    expect(testFormResolver.getFormStateSnapshot().foo).toEqual('1');
  });

  it('should add Control', () => {
    expect(testFormResolver.getFormStateSnapshot().bar).toBeUndefined();
    testForm.addControl('bar', new FormControl([0]));
    testFormResolver.addControl('bar', FormControlResolvers.simpleNumber);
    expect(testFormResolver.getFormStateSnapshot().bar).toEqual(0);
  });

  it('should update Control', () => {
    expect(testFormResolver.getFormStateSnapshot().foo).toEqual(1);
    testFormResolver.addControl('foo', FormControlResolvers.simpleString);
    expect(testFormResolver.getFormStateSnapshot().foo).toEqual('1');
  });

  it('should remove control', () => {
    expect(testFormResolver.getFormStateSnapshot().foo).toEqual(1);
    testFormResolver.removeControl('foo');
    expect(testFormResolver.getFormStateSnapshot().foo).toEqual(0);
  });

  it('should complete', () => {
    let value = 0;
    testFormResolver.getFormState().subscribe((state) => {
      value = state.foo;
    });
    testFormResolver.complete();
    testFormResolver.setFormState({ foo: 2 });
    expect(value).toEqual(0);
  });
});
