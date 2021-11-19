import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { QuestoesComponent } from './pages/questoes/questoes.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent
  },
  {
    path:'resultados',
    component: ResultadosComponent
  },
  {
    path:'questoes',
    component: QuestoesComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
