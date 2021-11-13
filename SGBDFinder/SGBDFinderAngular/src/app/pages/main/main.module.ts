import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SGBDController } from 'src/app/controllers/SGBDController';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class MainModule { }
