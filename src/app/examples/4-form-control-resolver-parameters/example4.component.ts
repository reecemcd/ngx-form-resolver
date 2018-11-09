import { FormResolverBuilder, FormResolver, FormControlResolver, FormControlResolvers } from 'ngx-form-resolver';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { replaceSpacesControlResolver } from './example4.resolvers';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NestedExampleClass } from '../example.models';

@Component({
  selector: 'app-example4',
  templateUrl: './example4.component.html',
  styleUrls: ['./example4.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Example4Component implements OnDestroy {

  resolvedState: NestedExampleClass = new NestedExampleClass();
  paramsFormGroup: FormGroup;

  paramsFormResolver: FormResolver<NestedExampleClass>;

  sourceTemplate$ = this.http.get(environment.urls.ex4 + '.component.html', {responseType: 'text'});
  sourceComponent$ = this.http.get(environment.urls.ex4 + '.component.ts', {responseType: 'text'});
  sourceResolvers$ = this.http.get(environment.urls.ex4 + '.resolvers.ts', {responseType: 'text'});

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private formResolverBuilder: FormResolverBuilder) {

    this.paramsFormGroup = this.formBuilder.group({
      'nestedValue': [''],
      'encodedMessage': ['']
    });

    this.paramsFormResolver = this.formResolverBuilder
      .setFactory(() => new NestedExampleClass)
      .setFormGroup(this.paramsFormGroup)
      .setResolvers({
        'nestedValue': FormControlResolvers.nestedString('outer.inner.target'),
        'encodedMessage': replaceSpacesControlResolver('_')
      })
      .build();

    this.paramsFormResolver.getFormState().subscribe((objState: NestedExampleClass) => {
      this.resolvedState = objState;
    });

    this.paramsFormResolver.setFormState({
      encodedMessage: 'This_is_a_test_message.',
      outer: {
        inner: {
          target: 'Example Nested Value'
        }
      }
    } as NestedExampleClass);
  }

  ngOnDestroy() {
    this.paramsFormResolver.complete();
  }

}
