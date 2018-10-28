import { TestBed } from '@angular/core/testing';

import { FormResolverBuilder } from './form-resolver-builder.service';

describe('FormResolverBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormResolverBuilder<any> = TestBed.get(FormResolverBuilder);
    expect(service).toBeTruthy();
  });
});
