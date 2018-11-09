import { FormControlResolvers } from './form-resolver.resolvers';

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

describe('Nested FormControlResolver', () => {

  it('should have an input and output resolver', () => {
    expect(FormControlResolvers.nested('').inputResolver).toBeDefined();
    expect(FormControlResolvers.nested('').outputResolver).toBeDefined();
  });

  it('should resolve immediate-depth prop input', () => {
    expect(FormControlResolvers.nested('foo').inputResolver({ foo: 1 }, 'foo'))
      .toEqual(1);
    expect(FormControlResolvers.nested('foo').inputResolver({ foo: '1' }, 'foo'))
      .toEqual('1');
  });

  it('should resolve multi-depth prop input', () => {
    expect(FormControlResolvers.nested('foo.bar').inputResolver({ foo: { bar: 2 } }, 'foo'))
      .toEqual(2);
    expect(FormControlResolvers.nested('foo.bar').inputResolver({ foo: { bar: '2' } }, 'foo'))
      .toEqual('2');
    expect(FormControlResolvers.nested('foo.bar.baz').inputResolver({ foo: { bar: { baz: 3 } } }, 'foo'))
      .toEqual(3);
    expect(FormControlResolvers.nested('foo.bar.baz').inputResolver({ foo: { bar: { baz: '3' } } }, 'foo'))
      .toEqual('3');
  });

  it('should resolve array based params input', () => {
    expect(FormControlResolvers.nested(['foo', 'bar']).inputResolver({ foo: { bar: 2 } }, 'foo'))
      .toEqual(2);
    expect(FormControlResolvers.nested(['foo', 'bar']).inputResolver({ foo: { bar: '2' } }, 'foo'))
      .toEqual('2');
  });

  it('should resolve immediate-depth output', () => {
    expect(FormControlResolvers.nested('foo').outputResolver({ foo: 0 }, { foo: 1 }, 'foo'))
      .toEqual({ foo: 1 });
    expect(FormControlResolvers.nested('foo').outputResolver({ foo: '0' }, { foo: '1' }, 'foo'))
      .toEqual({ foo: '1' });
  });

  it('should resolve multi-depth output', () => {
    expect(FormControlResolvers.nested('foo.bar').outputResolver({ foo: { bar: 2 } }, { baz: 3 }, 'baz'))
      .toEqual({ foo: { bar: 3 } });
    expect(FormControlResolvers.nested('foo.bar').outputResolver({ foo: { bar: '2' } }, { baz: '3' }, 'baz'))
      .toEqual({ foo: { bar: '3' } });
    expect(FormControlResolvers.nested('foo.bar.baz').outputResolver({ foo: { bar: { baz: 3 } } }, { ban: 4 }, 'ban'))
      .toEqual({ foo: { bar: { baz: 4 } } });
    expect(FormControlResolvers.nested('foo.bar.baz').outputResolver({ foo: { bar: { baz: '3' } } }, { ban: '4' }, 'ban'))
      .toEqual({ foo: { bar: { baz: '4' } } });
  });

  it('should resolve array based params output', () => {
    expect(FormControlResolvers.nested(['foo', 'bar']).outputResolver({ foo: { bar: 2 } }, { baz: 3 }, 'baz'))
      .toEqual({ foo: { bar: 3 } });
    expect(FormControlResolvers.nested(['foo', 'bar']).outputResolver({ foo: { bar: '2' } }, { baz: '3' }, 'baz'))
      .toEqual({ foo: { bar: '3' } });
  });

  it('should ignore absent input keys', () => {
    expect(FormControlResolvers.nested('bar').inputResolver({ foo: 1 }, 'bar'))
      .toBeUndefined();
    expect(FormControlResolvers.nested('bar').inputResolver({ foo: '1' }, 'bar'))
      .toBeUndefined();
  });

  it('should ignore absent output keys', () => {
    expect(FormControlResolvers.nested('bar').outputResolver({ foo: 0 }, { foo: 1 }, 'bar'))
      .toEqual({ foo: 0 });
    expect(FormControlResolvers.nested('bar').outputResolver({ foo: '0' }, { foo: '1' }, 'bar'))
      .toEqual({ foo: '0' });
  });

  it('should ignore undefined params input', () => {
    expect(FormControlResolvers.nested('bar.baz.ban').inputResolver({ foo: 0 }, 'bar'))
      .toBeUndefined();
    expect(FormControlResolvers.nested('bar.baz.ban').inputResolver({ foo: '0' }, 'bar'))
      .toBeUndefined();
  });

  it('should ignore undefined params output', () => {
    expect(FormControlResolvers.nested('bar.baz.ban').outputResolver({ foo: 0 }, { foo: 1 }, 'bar'))
      .toEqual({ foo: 0 });
    expect(FormControlResolvers.nested('bar.baz.ban').outputResolver({ foo: '0' }, { foo: '1' }, 'bar'))
      .toEqual({ foo: '0' });
  });

});

describe('NestedNumber FormControlResolver', () => {

  it('should have an input and output resolver', () => {
    expect(FormControlResolvers.nestedNumber('').inputResolver).toBeDefined();
    expect(FormControlResolvers.nestedNumber('').outputResolver).toBeDefined();
  });

  it('should resolve immediate-depth prop input', () => {
    expect(FormControlResolvers.nestedNumber('foo').inputResolver({ foo: 1 }, 'foo'))
      .toEqual(1);
    expect(FormControlResolvers.nestedNumber('foo').inputResolver({ foo: '1' }, 'foo'))
      .toEqual(1);
  });

  it('should resolve multi-depth prop input', () => {
    expect(FormControlResolvers.nestedNumber('foo.bar').inputResolver({ foo: { bar: 2 } }, 'foo'))
      .toEqual(2);
    expect(FormControlResolvers.nestedNumber('foo.bar').inputResolver({ foo: { bar: '2' } }, 'foo'))
      .toEqual(2);
    expect(FormControlResolvers.nestedNumber('foo.bar.baz').inputResolver({ foo: { bar: { baz: 3 } } }, 'foo'))
      .toEqual(3);
    expect(FormControlResolvers.nestedNumber('foo.bar.baz').inputResolver({ foo: { bar: { baz: '3' } } }, 'foo'))
      .toEqual(3);
  });

  it('should resolve array based params input', () => {
    expect(FormControlResolvers.nestedNumber(['foo', 'bar']).inputResolver({ foo: { bar: 2 } }, 'foo'))
      .toEqual(2);
    expect(FormControlResolvers.nestedNumber(['foo', 'bar']).inputResolver({ foo: { bar: '2' } }, 'foo'))
      .toEqual(2);
  });

  it('should resolve immediate-depth output', () => {
    expect(FormControlResolvers.nestedNumber('foo').outputResolver({ foo: 0 }, { foo: 1 }, 'foo'))
      .toEqual({ foo: 1 });
    expect(FormControlResolvers.nestedNumber('foo').outputResolver({ foo: '0' }, { foo: '1' }, 'foo'))
      .toEqual({ foo: 1 });
  });

  it('should resolve multi-depth output', () => {
    expect(FormControlResolvers.nestedNumber('foo.bar').outputResolver({ foo: { bar: 2 } }, { baz: 3 }, 'baz'))
      .toEqual({ foo: { bar: 3 } });
    expect(FormControlResolvers.nestedNumber('foo.bar').outputResolver({ foo: { bar: '2' } }, { baz: '3' }, 'baz'))
      .toEqual({ foo: { bar: 3 } });
    expect(FormControlResolvers.nestedNumber('foo.bar.baz').outputResolver({ foo: { bar: { baz: 3 } } }, { ban: 4 }, 'ban'))
      .toEqual({ foo: { bar: { baz: 4 } } });
    expect(FormControlResolvers.nestedNumber('foo.bar.baz').outputResolver({ foo: { bar: { baz: '3' } } }, { ban: '4' }, 'ban'))
      .toEqual({ foo: { bar: { baz: 4 } } });
  });

  it('should resolve array based params output', () => {
    expect(FormControlResolvers.nestedNumber(['foo', 'bar']).outputResolver({ foo: { bar: 2 } }, { baz: 3 }, 'baz'))
      .toEqual({ foo: { bar: 3 } });
    expect(FormControlResolvers.nestedNumber(['foo', 'bar']).outputResolver({ foo: { bar: '2' } }, { baz: '3' }, 'baz'))
      .toEqual({ foo: { bar: 3 } });
  });

  it('should ignore absent input keys', () => {
    expect(FormControlResolvers.nestedNumber('bar').inputResolver({ foo: 1 }, 'bar'))
      .toBeUndefined();
    expect(FormControlResolvers.nestedNumber('bar').inputResolver({ foo: '1' }, 'bar'))
      .toBeUndefined();
  });

  it('should ignore absent output keys', () => {
    expect(FormControlResolvers.nestedNumber('bar').outputResolver({ foo: 0 }, { foo: 1 }, 'bar'))
      .toEqual({ foo: 0 });
    expect(FormControlResolvers.nestedNumber('bar').outputResolver({ foo: '0' }, { foo: '1' }, 'bar'))
      .toEqual({ foo: '0' });
  });

  it('should ignore undefined params input', () => {
    expect(FormControlResolvers.nestedNumber('bar.baz.ban').inputResolver({ foo: 0 }, 'bar'))
      .toBeUndefined();
    expect(FormControlResolvers.nestedNumber('bar.baz.ban').inputResolver({ foo: '0' }, 'bar'))
      .toBeUndefined();
  });

  it('should ignore undefined params output', () => {
    expect(FormControlResolvers.nestedNumber('bar.baz.ban').outputResolver({ foo: 0 }, { foo: 1 }, 'bar'))
      .toEqual({ foo: 0 });
    expect(FormControlResolvers.nestedNumber('bar.baz.ban').outputResolver({ foo: '0' }, { foo: '1' }, 'bar'))
      .toEqual({ foo: '0' });
  });

});

describe('Nested FormControlResolver', () => {

  it('should have an input and output resolver', () => {
    expect(FormControlResolvers.nestedString('').inputResolver).toBeDefined();
    expect(FormControlResolvers.nestedString('').outputResolver).toBeDefined();
  });

  it('should resolve immediate-depth prop input', () => {
    expect(FormControlResolvers.nestedString('foo').inputResolver({ foo: 1 }, 'foo'))
      .toEqual('1');
    expect(FormControlResolvers.nestedString('foo').inputResolver({ foo: '1' }, 'foo'))
      .toEqual('1');
  });

  it('should resolve multi-depth prop input', () => {
    expect(FormControlResolvers.nestedString('foo.bar').inputResolver({ foo: { bar: 2 } }, 'foo'))
      .toEqual('2');
    expect(FormControlResolvers.nestedString('foo.bar').inputResolver({ foo: { bar: '2' } }, 'foo'))
      .toEqual('2');
    expect(FormControlResolvers.nestedString('foo.bar.baz').inputResolver({ foo: { bar: { baz: 3 } } }, 'foo'))
      .toEqual('3');
    expect(FormControlResolvers.nestedString('foo.bar.baz').inputResolver({ foo: { bar: { baz: '3' } } }, 'foo'))
      .toEqual('3');
  });

  it('should resolve array based params input', () => {
    expect(FormControlResolvers.nestedString(['foo', 'bar']).inputResolver({ foo: { bar: 2 } }, 'foo'))
      .toEqual('2');
    expect(FormControlResolvers.nestedString(['foo', 'bar']).inputResolver({ foo: { bar: '2' } }, 'foo'))
      .toEqual('2');
  });

  it('should resolve immediate-depth output', () => {
    expect(FormControlResolvers.nestedString('foo').outputResolver({ foo: 0 }, { foo: 1 }, 'foo'))
      .toEqual({ foo: '1' });
    expect(FormControlResolvers.nestedString('foo').outputResolver({ foo: '0' }, { foo: '1' }, 'foo'))
      .toEqual({ foo: '1' });
  });

  it('should resolve multi-depth output', () => {
    expect(FormControlResolvers.nestedString('foo.bar').outputResolver({ foo: { bar: 2 } }, { baz: 3 }, 'baz'))
      .toEqual({ foo: { bar: '3' } });
    expect(FormControlResolvers.nestedString('foo.bar').outputResolver({ foo: { bar: '2' } }, { baz: '3' }, 'baz'))
      .toEqual({ foo: { bar: '3' } });
    expect(FormControlResolvers.nestedString('foo.bar.baz').outputResolver({ foo: { bar: { baz: 3 } } }, { ban: 4 }, 'ban'))
      .toEqual({ foo: { bar: { baz: '4' } } });
    expect(FormControlResolvers.nestedString('foo.bar.baz').outputResolver({ foo: { bar: { baz: '3' } } }, { ban: '4' }, 'ban'))
      .toEqual({ foo: { bar: { baz: '4' } } });
  });

  it('should resolve array based params output', () => {
    expect(FormControlResolvers.nestedString(['foo', 'bar']).outputResolver({ foo: { bar: 2 } }, { baz: 3 }, 'baz'))
      .toEqual({ foo: { bar: '3' } });
    expect(FormControlResolvers.nestedString(['foo', 'bar']).outputResolver({ foo: { bar: '2' } }, { baz: '3' }, 'baz'))
      .toEqual({ foo: { bar: '3' } });
  });

  it('should ignore absent input keys', () => {
    expect(FormControlResolvers.nestedString('bar').inputResolver({ foo: 1 }, 'bar'))
      .toBeUndefined();
    expect(FormControlResolvers.nestedString('bar').inputResolver({ foo: '1' }, 'bar'))
      .toBeUndefined();
  });

  it('should ignore absent output keys', () => {
    expect(FormControlResolvers.nestedString('bar').outputResolver({ foo: 0 }, { foo: 1 }, 'bar'))
      .toEqual({ foo: 0 });
    expect(FormControlResolvers.nestedString('bar').outputResolver({ foo: '0' }, { foo: '1' }, 'bar'))
      .toEqual({ foo: '0' });
  });

  it('should ignore undefined params input', () => {
    expect(FormControlResolvers.nestedString('bar.baz.ban').inputResolver({ foo: 0 }, 'bar'))
      .toBeUndefined();
    expect(FormControlResolvers.nestedString('bar.baz.ban').inputResolver({ foo: '0' }, 'bar'))
      .toBeUndefined();
  });

  it('should ignore undefined params output', () => {
    expect(FormControlResolvers.nestedString('bar.baz.ban').outputResolver({ foo: 0 }, { foo: 1 }, 'bar'))
      .toEqual({ foo: 0 });
    expect(FormControlResolvers.nestedString('bar.baz.ban').outputResolver({ foo: '0' }, { foo: '1' }, 'bar'))
      .toEqual({ foo: '0' });
  });

});