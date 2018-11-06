import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { FormResolverBuilder } from './form-resolver-builder.service';

@NgModule({
  imports: [
  ],
  declarations: [],
  exports: []
})
export class FormResolverModule {

  constructor (@Optional() @SkipSelf() parentModule: FormResolverModule) {
    if (parentModule) {
      throw new Error(
        'FormResolverModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FormResolverModule,
      providers: [
        FormResolverBuilder
      ],
    };
  }

}
