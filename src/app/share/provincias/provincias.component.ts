import { Component, OnInit } from '@angular/core';
import { Argentina } from 'src/app/argentina';
import { MapaService } from 'src/app/mapa.service';

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.component.html',
  styleUrls: ['./provincias.component.css']
})
export class ProvinciasComponent implements OnInit {

  pais = new Argentina;
  constructor(private mapaServie: MapaService) {

    this.mapaServie.getOrganizationStatus(this.pais);
  }

  ngOnInit() {
  }

}
