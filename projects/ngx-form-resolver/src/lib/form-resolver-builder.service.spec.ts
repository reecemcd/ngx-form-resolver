import { FormBuilder } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { FormResolverBuilder } from './form-resolver-builder.service';
import { FormControlResolvers } from './form-resolver.resolvers';
import { FormResolver } from './form-resolver';

describe('FormResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ FormBuilder ]
  }));

  it('should be created', () => {
    const service: FormResolverBuilder = TestBed.get(FormResolverBuilder);
    expect(service).toBeTruthy();
  });

  it('should return a FormResolver', () => {
    const service: FormResolverBuilder = TestBed.get(FormResolverBuilder);
    const fb: FormBuilder = TestBed.get(FormBuilder);

    const formResolver = service
      .setFactory(() => ({ test: 'test'}))
      .setFormGroup(fb.group({ 'test': [null] }))
      .setResolvers({ 'test': FormControlResolvers.simple })
      .build();

    expect(formResolver).toBeDefined();
    expect(formResolver instanceof FormResolver).toBeTruthy();
  });
});
