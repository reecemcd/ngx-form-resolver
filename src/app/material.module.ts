import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

const MODULES = [
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatTabsModule,
]

@NgModule({
  imports: [
    CommonModule,
    ...MODULES,
  ],
  exports: [
    ...MODULES,
  ]
})
export class MaterialModule { }
