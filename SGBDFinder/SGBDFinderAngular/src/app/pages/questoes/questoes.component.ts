import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { SGBDController } from 'src/app/controllers/SGBDController';
import { iCaracteristicas } from 'src/app/models/iSGBD';

@Component({
  selector: 'app-questoes',
  templateUrl: './questoes.component.html',
  styleUrls: ['./questoes.component.css']
})
export class QuestoesComponent implements OnInit {


  public form: FormGroup;
  private characteristics: iCaracteristicas;

  constructor(
    private fb: FormBuilder,
    private controller: SGBDController,
    private router: Router,
  ) {
    let state = this.router.getCurrentNavigation()?.extras.state;
    
    if (state != null) {
      this.characteristics = state.form;
    }
    else{
      this.characteristics = {
        seguranca: 0,
        consistencia_integridade: 0,
        disponibilidade: 0,
        facilidade_uso: 0,
        interoperabilidade: 0,
        desempenho_escalabilidade: 0,
      };
    }
    this.form = this.fb.group({
      seg1: ['0'],
      seg2: ['0'],
      seg3: ['0'],
      seg4: ['0'],

      disp1: ['0'],
      disp2: ['0'],
      disp3: ['0'],

      cons1: ['0'],
      cons2: ['0'],
      cons3: ['0'],

      usab1: ['0'],
      usab2: ['2'],
      usab3: ['0'],
      
      interop1: ['0'],
      interop2: ['0'],
      interop3: ['0'],

      desem1: ['0'],
      desem2: ['0'],
      desem3: ['0'],
    });
  }

  ngOnInit(): void {

  }

  submit(val: any) {
    if (this.form.valid) {

      this.characteristics.seguranca = +this.characteristics.seguranca; //convert to number

      this.characteristics.seguranca += +val.seg1;
      this.characteristics.seguranca += +val.seg2;
      this.characteristics.seguranca += +val.seg3;
      this.characteristics.seguranca += +val.seg4;

      this.characteristics.disponibilidade = +this.characteristics.disponibilidade;

      this.characteristics.disponibilidade += +val.disp1;
      this.characteristics.disponibilidade += +val.disp2;
      this.characteristics.disponibilidade += +val.disp3;

      this.characteristics.consistencia_integridade = +this.characteristics.consistencia_integridade;

      this.characteristics.consistencia_integridade += +val.cons1;
      this.characteristics.consistencia_integridade += +val.cons2;
      this.characteristics.consistencia_integridade += +val.cons3;

      this.characteristics.facilidade_uso = +this.characteristics.facilidade_uso;

      this.characteristics.facilidade_uso += +val.usab1;
      this.characteristics.facilidade_uso += +val.usab2;
      this.characteristics.facilidade_uso += +val.usab3;

      this.characteristics.interoperabilidade = +this.characteristics.interoperabilidade;

      this.characteristics.interoperabilidade += +val.interop1;
      this.characteristics.interoperabilidade += +val.interop2;
      this.characteristics.interoperabilidade += +val.interop3;

      this.characteristics.desempenho_escalabilidade = +this.characteristics.desempenho_escalabilidade;

      this.characteristics.desempenho_escalabilidade += +val.desem1;
      this.characteristics.desempenho_escalabilidade += +val.desem2;
      this.characteristics.desempenho_escalabilidade += +val.desem3;
      
      this.controller.GetNearestNeighbors(this.characteristics)?.then((res) => {
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
