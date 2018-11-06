import { ExamplesComponent } from './examples/examples.component';
import { FormResolverModule } from 'ngx-form-resolver';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Example1Component } from './examples/1-basic-form-resolver/example1.component';
import { Example2Component } from './examples/2-dynamic-form-resolver/example2.component';
import { Example3Component } from './examples/3-custom-form-control-resolver/example3.component';
import { Example4Component } from './examples/4-form-control-resolver-parameters/example4.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { PrismModule } from '@sgbj/angular-prism';

import 'prismjs/prism';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup';

@NgModule({
  declarations: [
    AppComponent,
    ExamplesComponent,
    Example1Component,
    Example2Component,
    Example3Component,
    Example4Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormResolverModule.forRoot(),
    AppRoutingModule,
    PrettyJsonModule,
    HttpClientModule,
    PrismModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
