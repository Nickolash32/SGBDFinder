import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { SGBDController } from 'src/app/controllers/SGBDController';
import { iCaracteristicas } from 'src/app/models/iSGBD';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  valueRange: number[] = [0, 1, 2, 3, 4, 5];//, 6, 7, 8, 9, 10
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private controller: SGBDController,
    private router: Router,
  ) { 
    this.form = this.fb.group({
      seguranca: ['0'],
      consistencia_integridade: ['0'],
      disponibilidade: ['0'],
      facilidade_uso: ['0'],
      interoperabilidade: ['0'],
      desempenho_escalabilidade: ['0'],
    });
  }

  ngOnInit(): void {
    
  }

  submit(val: iCaracteristicas){
    if(this.form.valid){
      this.controller.GetNearestNeighbors(val)?.then((res)=>{
        let extras: NavigationExtras = {
          state: {
            results: res,
          }
        }
        this.router.navigate(['/resultados'], extras);
      });
    }
  }

}
