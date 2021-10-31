import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent
  },
  {
    path:'resultados',
    component: ResultadosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
