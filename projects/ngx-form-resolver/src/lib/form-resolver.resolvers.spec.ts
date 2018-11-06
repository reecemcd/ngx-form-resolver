import { FormBuilder } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { FormResolverBuilder } from './form-resolver-builder.service';
import { FormControlResolvers } from './form-resolver.resolvers';
import { FormResolver } from './form-resolver';

describe('Simple FormControlResolver', () => {

  it('should have an input and output resolver', () => {
    expect(FormControlResolvers.simple.inputResolver).toBeDefined();
    expect(FormControlResolvers.simple.outputResolver).toBeDefined();
  });

  it('should resolve input', () => {
    expect(FormControlResolvers.simple.inputResolver({ foo: 1 }, 'foo'))
      .toEqual(1);
    expect(FormControlResolvers.simple.inputResolver({ foo: '1' }, 'foo'))
      .toEqual('1');
  });

  it('should resolve output', () => {
    expect(FormControlResolvers.simple.outputResolver({ foo: 0 }, { foo: 1 }, 'foo'))
      .toEqual({ foo: 1 });
    expect(FormControlResolvers.simple.outputResolver({ foo: '0' }, { foo: '1' }, 'foo'))
      .toEqual({ foo: '1' });
  });

  it('should ignore absent input keys', () => {
    expect(FormControlResolvers.simple.inputResolver({ foo: 1 }, 'bar'))
      .toBeUndefined();
    expect(FormControlResolvers.simple.inputResolver({ foo: '1' }, 'bar'))
      .toBeUndefined();
  });

  it('should ignore absent output keys', () => {
    expect(FormControlResolvers.simple.outputResolver({ foo: 0 }, { foo: 1 }, 'bar'))
      .toEqual({ foo: 0 });
    expect(FormControlResolvers.simple.outputResolver({ foo: '0' }, { foo: '1' }, 'bar'))
      .toEqual({ foo: '0' });
  });

});

describe('SimpleNumber FormControlResolver', () => {

  it('should have an input and output resolver', () => {
    expect(FormControlResolvers.simpleNumber.inputResolver).toBeDefined();
    expect(FormControlResolvers.simpleNumber.outputResolver).toBeDefined();
  });

  it('should resolve input', () => {
    expect(FormControlResolvers.simpleNumber.inputResolver({ foo: 1 }, 'foo'))
      .toEqual(1);
    expect(FormControlResolvers.simpleNumber.inputResolver({ foo: '1' }, 'foo'))
      .toEqual(1);
  });

  it('should resolve output', () => {
    expect(FormControlResolvers.simpleNumber.outputResolver({ foo: 0 }, { foo: 1 }, 'foo'))
      .toEqual({ foo: 1 });
    expect(FormControlResolvers.simpleNumber.outputResolver({ foo: '0' }, { foo: '1' }, 'foo'))
      .toEqual({ foo: 1 });
  });

  it('should ignore absent input keys', () => {
    expect(FormControlResolvers.simpleNumber.inputResolver({ foo: 1 }, 'bar'))
      .toBeUndefined();
    expect(FormControlResolvers.simpleNumber.inputResolver({ foo: '1' }, 'bar'))
      .toBeUndefined();
  });

  it('should ignore absent output keys', () => {
    expect(FormControlResolvers.simpleNumber.outputResolver({ foo: 0 }, { foo: 1 }, 'bar'))
      .toEqual({ foo: 0 });
    expect(FormControlResolvers.simpleNumber.outputResolver({ foo: '0' }, { foo: '1' }, 'bar'))
      .toEqual({ foo: '0' });
  });

});

describe('SimpleString FormControlResolver', () => {

  it('should have an input and output resolver', () => {
    expect(FormControlResolvers.simpleString.inputResolver).toBeDefined();
    expect(FormControlResolvers.simpleString.outputResolver).toBeDefined();
  });

  it('should resolve input', () => {
    expect(FormControlResolvers.simpleString.inputResolver({ foo: 1 }, 'foo'))
      .toEqual('1');
    expect(FormControlResolvers.simpleString.inputResolver({ foo: '1' }, 'foo'))
      .toEqual('1');
  });

  it('should resolve output', () => {
    expect(FormControlResolvers.simpleString.outputResolver({ foo: 0 }, { foo: 1 }, 'foo'))
      .toEqual({ foo: '1' });
    expect(FormControlResolvers.simpleString.outputResolver({ foo: '0' }, { foo: '1' }, 'foo'))
      .toEqual({ foo: '1' });
  });

  it('should ignore absent input keys', () => {
    expect(FormControlResolvers.simpleString.inputResolver({ foo: 1 }, 'bar'))
      .toBeUndefined();
    expect(FormControlResolvers.simpleString.inputResolver({ foo: '1' }, 'bar'))
      .toBeUndefined();
  });

  it('should ignore absent output keys', () => {
    expect(FormControlResolvers.simple.outputResolver({ foo: 0 }, { foo: 1 }, 'bar'))
      .toEqual({ foo: 0 });
    expect(FormControlResolvers.simple.outputResolver({ foo: '0' }, { foo: '1' }, 'bar'))
      .toEqual({ foo: '0' });
  });

});