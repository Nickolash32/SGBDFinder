import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iSGBD } from 'src/app/models/iSGBD';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  results: iSGBD[] = [];

  constructor(
    private router: Router
  ) {
    let state = this.router.getCurrentNavigation()?.extras.state;
    if (state != null) {
      this.results = state.results;
    }
  }

  ngOnInit(): void {

  }



}
