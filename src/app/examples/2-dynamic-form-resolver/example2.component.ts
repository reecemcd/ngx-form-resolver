import { FormResolverBuilder, FormResolver, FormControlResolvers } from 'ngx-form-resolver';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Car } from '../example.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-example2',
  templateUrl: './example2.component.html',
  styleUrls: ['./example2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Example2Component {

  currentState: Car = new Car();
  showYearControl: boolean = false;
  useColorFactory: boolean = false;

  carFormGroup: FormGroup;
  carFormResolver: FormResolver<Car>;

  sourceTemplate$ = this.http.get(environment.urls.ex2 + '.component.html', {responseType: 'text'});
  sourceComponent$ = this.http.get(environment.urls.ex2 + '.component.ts', {responseType: 'text'});

  constructor(private formBuilder: FormBuilder, 
    private http: HttpClient,
    private formResolverBuilder: FormResolverBuilder) {

    this.carFormGroup = formBuilder.group({
      'make': [''],
      'model': ['']
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

    this.carFormResolver.getFormState()
      .subscribe((car: Car) => {
        this.currentState = car;
      });

  }

  ngOnDestroy() {
    this.carFormResolver.complete();
  }

  addYearControl() {
    this.carFormGroup.addControl('year', new FormControl(''));
    this.carFormResolver.addControl('year', FormControlResolvers.simple);
    this.showYearControl = true;
  }

  removeYearControl() {
    this.carFormGroup.removeControl('year');
    this.carFormResolver.removeControl('year');
    this.showYearControl = false;
  }

  setColorFactory() {
    this.useColorFactory = true;
    this.carFormResolver.updateFactory(() => {
      let result = new Car;
      result.color = 'Red';
      return result;
    });
  }

  resetFactory() {
    this.useColorFactory = false;
    this.carFormResolver.updateFactory(() => new Car());
  }

  setFormState() {
    this.carFormResolver.setFormState({
      make: 'Ford',
      model: 'GT',
      year: 2017,
    } as Car);
  }

  clearFormState() {
    this.carFormResolver.setFormState(new Car());
  }

}
