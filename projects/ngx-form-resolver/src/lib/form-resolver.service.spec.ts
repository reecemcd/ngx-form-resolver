import { TestBed } from '@angular/core/testing';

import { FormResolver } from './form-resolver';

describe('NgxFgResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormResolver<any> = TestBed.get(FormResolver);
    expect(service).toBeTruthy();
  });
});
