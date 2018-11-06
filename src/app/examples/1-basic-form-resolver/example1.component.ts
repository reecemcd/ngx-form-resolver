import { environment } from './../../../environments/environment';
import { FormResolverBuilder, FormResolver, FormControlResolvers } from 'ngx-form-resolver';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Car } from '../example.models';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Example1Component implements OnDestroy {

  submittedCar: Car = new Car();

  carFormGroup: FormGroup;
  carFormResolver: FormResolver<Car>;

  sourceTemplate$ = this.http.get(environment.urls.ex1 + '.component.html', {responseType: 'text'});
  sourceComponent$ = this.http.get(environment.urls.ex1 + '.component.ts', {responseType: 'text'});

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private formResolverBuilder: FormResolverBuilder) {

    this.carFormGroup = formBuilder.group({
      'make': [''],
      'model': [''],
      'year': [null]
    });

    this.carFormResolver = this.formResolverBuilder
      .setFactory(() => new Car())
      .setFormGroup(this.carFormGroup)
      .setResolvers({
        'make': FormControlResolvers.simple,
        'model': FormControlResolvers.simple,
        'year': FormControlResolvers.simpleNumber
      })
      .build();

  }

  ngOnDestroy() {
    this.carFormResolver.complete();
  }

  onSubmit() {
    this.submittedCar = this.carFormResolver.getFormStateSnapshot();
  }

}
