import { FooBarBaz } from './../example.models';
import { FormResolverBuilder, FormResolver, FormControlResolvers, FormControlResolver } from 'ngx-form-resolver';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Car } from '../example.models';
import { FooBazControlResolver, FooBarControlResolver } from './example3.resolvers';

@Component({
  selector: 'app-example3',
  templateUrl: './example3.component.html',
  styleUrls: ['./example3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Example3Component implements OnDestroy {

  currentFoo: FooBarBaz = new FooBarBaz();

  fooFormGroup: FormGroup;
  fooFormResolver: FormResolver<FooBarBaz>;

  constructor(private formBuilder: FormBuilder, private formResolverBuilder: FormResolverBuilder) {

    this.fooFormGroup = formBuilder.group({
      'foo': [''],
      'bar': [''],
      'baz': ['']
    });

    this.fooFormResolver = this.formResolverBuilder
      .setFactory(() => new FooBarBaz())
      .setFormGroup(this.fooFormGroup)
      .setResolvers({
        'foo': FormControlResolvers.simple,
        'bar': FooBarControlResolver,
        'baz': FooBazControlResolver,
      })
      .build();

    this.fooFormResolver.getFormState()
      .subscribe((foo: FooBarBaz) => {
        this.currentFoo = foo;
      })

  }

  ngOnDestroy() {
    this.fooFormResolver.complete();
  }

  setFormState() {
    this.fooFormResolver.setFormState({
      foo: 'foo',
      merged: {
        foobar: 'foobar',
        foobaz: 'foobaz'
      }
    } as FooBarBaz);
  }

  clearFormState() {
    this.fooFormResolver.setFormState(new FooBarBaz());
  }

}
