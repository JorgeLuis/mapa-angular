import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import * as mapboxgl from 'mapbox-gl';
import { Argentina, Provincia } from '../../argentina';
import { MapaService } from '../../mapa.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  reason = '';

  pais = new Argentina;
  mapa: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = -38.305025;
  lng = -66.029108;
  estados: any;
  tiposDeRedes: any;
  provincias: any;

  selectedValueOnOff = 'online-offline';
  selectedValueTipoRed = 'usap-z3';
  selectedValueProvincias = '708233';

  constructor(private mapaServie: MapaService) {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken')
      .set('pk.eyJ1Ijoiamxlc2Nhbm8iLCJhIjoiY2pzb3A1dzlyMHA1eTN5cDlsZDQycGh0cCJ9.g5HDhLFTrAjO4X0WRF2Kcw');
    // console.log(mapboxgl);
  }

  ngOnInit(): void {
    this.provincias = this.mapaServie.getProvincias();
    this.tiposDeRedes = this.mapaServie.getTipoDeRed();
    this.estados = this.mapaServie.getEstado();
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: this.style,
      center: [this.lng, this.lat],
      zoom: 3
    });


    // console.log('A_A: ' + this.mapa);
    this.mapa.addControl(new mapboxgl.NavigationControl());

    this.mapaServie.getPredios(this.pais.getSantaCruz, this.pais, this.mapa);
    // console.log(networks);
  }

  changeZone(provincia: Provincia, reason: string, id: string) {

    console.log(provincia.organizationId);
    this.lat = provincia.getCoordenadas.lat;
    this.lng = provincia.getCoordenadas.lng;

    this.mapa.setZoom(4);
    // this.mapa.setCenter({ lng: this.lng, lat: this.lat });

    this.mapa.flyTo({
      center: [
        this.lng,
        this.lat]
    });

    this.mapaServie.getPredios(provincia, this.pais, this.mapa);
    this.close(reason);
  }

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

}
