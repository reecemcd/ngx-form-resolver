import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesComponent } from './examples/examples.component';

const routes: Routes = [
  { path: '', redirectTo: '/examples', pathMatch: 'full' },
  { path: 'examples', component: ExamplesComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}