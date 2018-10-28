
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlResolver } from './form-resolver.models';
import { FormResolver } from './form-resolver';

@Injectable({
  providedIn: 'root'
})
export class FormResolverBuilder {

  private _activeFactory: Function;
  private _activeFormGroup: FormGroup;
  private _activeResolvers: { [key: string]: FormControlResolver<any> };

  constructor() { }

  public setFactory(factory: Function) {
    this._activeFactory = factory;
    return this;
  }

  public setFormGroup(formGroup: FormGroup) {
    this._activeFormGroup = formGroup;
    return this;
  }

  public setResolvers(resolverConfig: { [key: string]: FormControlResolver<any> }) {
    this._activeResolvers = resolverConfig;
    return this;
  }

  public build() {
    if (this._activeFactory && this._activeFormGroup && this._activeResolvers) {
      return new FormResolver<any>(
        this._activeFormGroup,
        this._activeFactory,
        this._activeResolvers
      );
    }
    else {
      throw 'You must call setFactory, setFormGroup, and setResolversz before you can build a FormResolver<T>';
    }
  }
}
