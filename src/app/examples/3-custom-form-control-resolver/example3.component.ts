import { FooBarBaz } from './../example.models';
import { FormResolverBuilder, FormResolver, FormControlResolvers } from 'ngx-form-resolver';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FooBazControlResolver, FooBarControlResolver } from './example3.resolvers';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

  sourceTemplate$ = this.http.get(environment.urls.ex3 + '.component.html', {responseType: 'text'});
  sourceComponent$ = this.http.get(environment.urls.ex3 + '.component.ts', {responseType: 'text'});
  sourceResolvers$ = this.http.get(environment.urls.ex3 + '.resolvers.ts', {responseType: 'text'});

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private formResolverBuilder: FormResolverBuilder) {

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
      });

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
