import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';
import { DeviceStatus, Argentina, Provincia, InfoPredio } from './argentina';


export interface Nodo {
  value: string;
  viewValue: string;
}


@Injectable({
  providedIn: 'root'
})
export class MapaService {


  tiposDeTags: Nodo[] = [
    { value: 'alta', viewValue: 'ALTA' },
    { value: 'lab', viewValue: 'LAB' },
    { value: 'crm', viewValue: 'CRM' },
    { value: 'cert_lac', viewValue: 'CERT_LAC' }
    // { value: 'z3', viewValue: 'Z3' }
  ];

  estados: Nodo[] = [
    { value: 'online-offline', viewValue: 'Online-Offline' },
    { value: 'online', viewValue: 'Online' },
    { value: 'offline', viewValue: 'Offline' }
  ];

  tiposDeRED: Nodo[] = [
    { value: 'usap-z3', viewValue: 'USAP/Z3' },
    { value: 'usap', viewValue: 'USAP' },
    { value: 'z3', viewValue: 'Z3' }
  ];

  provincias: Nodo[] = [
    { viewValue: 'BUENOS AIRES #1', value: '708233' },
    { viewValue: 'BUENOS AIRES #2', value: '635570497412661753' },
    { viewValue: 'BUENOS AIRES #3', value: '635570497412661754' },
    { viewValue: 'BUENOS AIRES #4', value: '635570497412661755' },
    { viewValue: 'CATAMARCA', value: '635570497412661756' },
    { viewValue: 'CHACO', value: '635570497412661757' },
    { viewValue: 'CHUBUT', value: '635570497412661758' },
    { viewValue: 'CABA', value: '635570497412661759' },
    { viewValue: 'CORDOBA', value: '635570497412661760' },
    { viewValue: 'CORRIENTES', value: '635570497412661761' },
    { viewValue: 'EDUCAR_20', value: '689613692941107203' },
    { viewValue: 'ENTRE RIOS', value: '635570497412661762' },
    { viewValue: 'FORMOSA', value: '635570497412661763' },
    { viewValue: 'JUJUY', value: '635570497412661764' },
    { viewValue: 'LA PAMPA', value: '635570497412661765' },
    { viewValue: 'LA RIOJA', value: '635570497412661766' },
    { viewValue: 'MENDOZA', value: '635570497412661767' },
    { viewValue: 'MISIONES', value: '635570497412661768' },
    { viewValue: 'NEUQUEN', value: '635570497412661769' },
    { viewValue: 'RIO NEGRO', value: '635570497412661770' },
    { viewValue: 'SALTA', value: '635570497412661771' },
    { viewValue: 'SAN JUAN', value: '635570497412661772' },
    { viewValue: 'SAN LUIS', value: '635570497412661773' },
    { viewValue: 'SANTA FE', value: '635570497412661775' },
    { viewValue: 'SGO. DEL ESTERO', value: '635570497412661776' },
    { viewValue: 'SANTA CRUZ', value: '635570497412661774' },
    { viewValue: 'TIERRA DEL FUEGO', value: '635570497412661777' },
    { viewValue: 'TUCUMAN', value: '635570497412661778' }
  ];
  listOnline: DeviceStatus[] = [];
  listNoline: DeviceStatus[] = [];

  opciones = {
    headers: new HttpHeaders({
      'X-Cisco-Meraki-API-Key': 'b60a999c25774afe10be110998ffcf365368be78',
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    })
  };
  constructor(private httpMeraki: HttpClient) { }

  getPredios(p: Provincia, pais: Argentina, mapa: mapboxgl.Map) {

    // this.getOrganizationStatus(pais);
    // this.getLtdLgd(listaIdNetwork, mapa);
    const urlTemplate = 'https://api.meraki.com/api/v0/organizations/' + p.organizationId + '/deviceStatuses';
    this.httpMeraki.get(urlTemplate, this.opciones)
      .toPromise().then(
        (data: [any]) => {
          p.getTotalDevices = data;
          p.listOnline = data.filter(pp => pp.status === 'online');
          p.listOnlineQ2TN = data.filter(pp => pp.status === 'online' && pp.serial.includes('Q2TN'));
          p.listOnlineQ2PN = data.filter(pp => pp.status === 'online' && pp.serial.includes('Q2PN'));

          p.listOffline = data.filter(pp => pp.status === 'offline');
          p.listOfflineQ2TN = data.filter(pp => pp.status === 'offline' && pp.serial.includes('Q2TN'));
          p.listOfflineQ2PN = data.filter(pp => pp.status === 'offline' && pp.serial.includes('Q2PN'));

          // console.log(' USAP: ' + p.listOnlineQ2PN.length + '  ' + p.listOfflineQ2PN.length);
          // console.log(' Z3: ' + p.listOnlineQ2TN.length + '  ' + p.listOfflineQ2TN.length);
          this.getEstadoList(p, true, pais, mapa);

        });

  }

  getLtdLgd(listaIdNetwork, mapa: mapboxgl.Map) {
    console.log('listaIdNetwork: ' + listaIdNetwork);
    let cant = 0;
    listaIdNetwork.map(e => {
      const urlTemplate = 'https://api.meraki.com/api/v0/networks/' + e.id + '/devices';
      cant = cant + 1;

      setTimeout(async () => {
        this.httpMeraki.get(urlTemplate, this.opciones)
          .toPromise().then(
            (data: any) => {
              console.log(data[0]);

              new mapboxgl.Marker({ color: 'green' })
                .setLngLat({ lng: data[0].lng, lat: data[0].lat })
                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                  .setHTML('<h3 style="text-align: center;">' + listaIdNetwork.name +
                    '</h3><p>' + 'Dirección: ' + data[0].address + '</p>' + '<p>' + 'Equipo: ' + data[0].model + '</p>'))
                .addTo(mapa);
            });
      }, cant * 1000
      );
    });
  }


  getOrganizationStatus(pais: Argentina) {

    for (const p of pais.getProvincias) {
      const urlTemplate = 'https://api.meraki.com/api/v0/organizations/' + p.organizationId + '/deviceStatuses';
      this.httpMeraki.get(urlTemplate, this.opciones)
        .toPromise().then(
          (data: [any]) => {

            p.getTotalDevices = data;
            p.listOnline = data.filter(pp => pp.status === 'online');
            p.listOnlineQ2TN = data.filter(pp => pp.status === 'online' && pp.serial.includes('Q2TN'));
            p.listOnlineQ2PN = data.filter(pp => pp.status === 'online' && pp.serial.includes('Q2PN'));

            p.listOffline = data.filter(pp => pp.status === 'offline');
            p.listOfflineQ2TN = data.filter(pp => pp.status === 'offline' && pp.serial.includes('Q2TN'));
            p.listOfflineQ2PN = data.filter(pp => pp.status === 'offline' && pp.serial.includes('Q2PN'));

            console.log('              ');
            console.log('ID: ' + data);
            // console.log('listOnlineQ2TN: ' + p.listOnlineQ2TN);
            console.log('              ');
          });
    }
  }

  getProvinciaStatus(p: Provincia, pieChartData: any, pieChartLabels: any, pieChartData2: any, pieChartLabels2: any) {
    const urlTemplate = 'https://api.meraki.com/api/v0/organizations/' + p.organizationId + '/deviceStatuses';
    this.httpMeraki.get(urlTemplate, this.opciones)
      .toPromise().then(
        (data: [any]) => {

          p.getTotalDevices = data;
          p.listOnline = data.filter(pp => pp.status === 'online');
          p.listOnlineQ2TN = data.filter(pp => pp.status === 'online' && pp.serial.includes('Q2TN'));
          p.listOnlineQ2PN = data.filter(pp => pp.status === 'online' && pp.serial.includes('Q2PN'));

          p.listOffline = data.filter(pp => pp.status === 'offline');
          p.listOfflineQ2TN = data.filter(pp => pp.status === 'offline' && pp.serial.includes('Q2TN'));
          p.listOfflineQ2PN = data.filter(pp => pp.status === 'offline' && pp.serial.includes('Q2PN'));

          console.log(' USAP: ' + p.listOnlineQ2PN.length + '  ' + p.listOfflineQ2PN.length);
          const totalQ2PN = p.listOnlineQ2PN.length + p.listOfflineQ2PN.length;
          const valor = Math.round(p.listOnlineQ2PN.length * 100 / totalQ2PN);

          if (totalQ2PN > 0) {
            pieChartData.push(valor);
            pieChartData.push(100 - valor);

            pieChartLabels.push('Online ');
            pieChartLabels.push('Offline ');
          } else {
            pieChartData.push(0);
            pieChartData.push(0);
          }

          console.log(' Z3: ' + p.listOnlineQ2TN.length + '  ' + p.listOfflineQ2TN.length);
          const totalQ2TN2 = p.listOnlineQ2TN.length + p.listOfflineQ2TN.length;

          if (totalQ2TN2 > 0) {
            const valor2 = Math.round(p.listOnlineQ2TN.length * 100 / totalQ2TN2);
            pieChartData2.push(valor2);
            pieChartData2.push(100 - valor2);

            pieChartLabels2.push('Online ');
            pieChartLabels2.push('Offline ');
          } else {
            pieChartData2.push(0);
            pieChartData2.push(0);
          }

          // console.log(' A_A ' + p.listOnlineQ2TN);
          this.getEstadoList(p, false, null, null);

        });
  }

  getEstadoList(p: Provincia, is_mapa: boolean, pais: Argentina, mapa: mapboxgl.Map) {
    const urlTemplate = 'https://api.meraki.com/api/v0/organizations/' + p.organizationId + '/networks';
    this.httpMeraki.get(urlTemplate, this.opciones)
      .toPromise().then(
        (data: [any]) => {
          const idsListOnlineQ2TN = [];
          const idsListOfflineQ2TN = [];
          const idsListOnlineQ2PN = [];
          const idsListOfflineQ2PN = [];


          p.listOnlineQ2TN.map((req) => {
            idsListOnlineQ2TN.push(req.networkId);
          });

          p.listOfflineQ2TN.map((req) => {
            idsListOfflineQ2TN.push(req.networkId);
          });

          p.listOnlineQ2PN.map((req) => {
            idsListOnlineQ2PN.push(req.networkId);
          });

          p.listOfflineQ2PN.map((req) => {
            idsListOfflineQ2PN.push(req.networkId);
          });

          data.filter((predio: InfoPredio) => {
            if (idsListOnlineQ2TN.indexOf(predio.id) >= 0) {
              p.statesListOnlineQ2TN.push(predio);
            }
          });


          data.filter((predio: InfoPredio) => {
            if (idsListOfflineQ2TN.indexOf(predio.id) >= 0) {
              p.statesListOfflineQ2TN.push(predio);
            }
          });


          data.filter((predio: InfoPredio) => {
            if (idsListOnlineQ2PN.indexOf(predio.id) >= 0) {
              p.statesListOnlineQ2PN.push(predio);
            }
          });


          data.filter((predio: InfoPredio) => {
            if (idsListOfflineQ2PN.indexOf(predio.id) >= 0) {
              p.statesListOfflineQ2PN.push(predio);
            }
          });


          // console.log('VALOR:' + CRM_ONLINE + CRM_OFFLINE);
          // const soloCERT = p.statesListOnlineQ2PN.filter(e => e.tags.includes('CERT_LAC'));
          // console.log('Cantidad de solo CRM: ' + soloCERT.length);
          // console.log('CRM: ' + soloCERT);
          // console.log('FIN ');
          // if (is_mapa) {
          //   console.log('ENTONCES AHORA');
          //   this.getLtdLgd(p.statesListOfflineQ2PN, mapa);
          // }
        });
  }

  getEstado() {
    return this.estados;
  }

  getTipoDeRed() {
    return this.tiposDeRED;
  }

  getProvincias() {
    return this.provincias;
  }

  getTiposDeTags() {
    return this.tiposDeTags;
  }
}
