import { FormResolverBuilder, FormResolver } from 'ngx-form-resolver';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { replaceSpacesControlResolver } from './example4.resolvers';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-example4',
  templateUrl: './example4.component.html',
  styleUrls: ['./example4.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Example4Component implements OnDestroy {

  currentMessage: string = '';
  messageFormGroup: FormGroup;

  messageFormResolver: FormResolver<string>;

  sourceTemplate$ = this.http.get(environment.urls.ex4 + '.component.html', {responseType: 'text'});
  sourceComponent$ = this.http.get(environment.urls.ex4 + '.component.ts', {responseType: 'text'});
  sourceResolvers$ = this.http.get(environment.urls.ex4 + '.resolvers.ts', {responseType: 'text'});

  constructor(private formBuilder: FormBuilder, 
    private http: HttpClient,
    private formResolverBuilder: FormResolverBuilder) {

    this.messageFormGroup = this.formBuilder.group({
      'message': ['']
    });

    this.messageFormResolver = this.formResolverBuilder
      .setFactory(() => '')
      .setFormGroup(this.messageFormGroup)
      .setResolvers({
        'message': replaceSpacesControlResolver('_')
      })
      .build();

    this.messageFormResolver.getFormState().subscribe((message: string) => {
      this.currentMessage = message;
    });

    this.messageFormResolver.setFormState('This_is_a_test_message.');
  }

  ngOnDestroy() {
    this.messageFormResolver.complete();
  }

}
