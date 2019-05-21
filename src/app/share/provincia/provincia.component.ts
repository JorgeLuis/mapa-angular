import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { MapaService, Nodo } from 'src/app/mapa.service';
import { Argentina, Provincia } from 'src/app/argentina';

import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.css']
})
export class ProvinciaComponent implements OnInit {

  selectedTags = 'crm';
  filtros_tags: Nodo[];

  tags_online = [];
  tags_offline = [];

  panelOpenState = false;
  provincia: Provincia;
  idOrg: any;
  name_provincia: any;
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'top',
      labels: {
        // This more specific font property overrides the global property
        fontColor: 'black',
        fontSize: 12,
      }
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
        color: 'white',
        font: {
          weight: 'normal',
          size: 25,
        }
      },
    },
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      color: ['white'],
      backgroundColor: ['#28a745', '#007bff'],
    },
  ];

  //

  public pieChartOptions2: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'top',
      labels: {
        // This more specific font property overrides the global property
        fontColor: 'black',
        fontSize: 12,
      }
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
        color: 'white',
        font: {
          weight: 'normal',
          size: 25,
        }
      },
    },
  };

  public pieChartLabels2: Label[] = [];
  public pieChartData2: SingleDataSet = [];
  public pieChartType2: ChartType = 'pie';
  public pieChartLegend2 = true;
  public pieChartPlugins2 = [pluginDataLabels];
  public pieChartColors2 = [
    {
      color: ['white'],
      backgroundColor: ['#28a745', '#007bff'],
    },
  ];




  constructor(private router: ActivatedRoute, private mapaServie: MapaService) {

    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

    this.router.params.subscribe(params => {
      // console.log(params['idOrg']);
      this.idOrg = params['idOrg'];

    });
  }

  ngOnInit() {
    this.name_provincia = this.mapaServie.provincias.filter((e) => e.value === this.idOrg)[0];
    // console.log(this.name_provincia);
    this.provincia = new Provincia(this.name_provincia, this.idOrg, { lat: -34.6131516, lng: -58.3772316 });
    this.mapaServie.getProvinciaStatus(this.provincia, this.pieChartData, this.pieChartLabels, this.pieChartData2, this.pieChartLabels2);

    this.filtros_tags = this.mapaServie.getTiposDeTags();
  }


  filtro_ALTA() {
    const ALTA_ONLINE = this.provincia.statesListOnlineQ2PN.filter
      (e => !e.tags.includes('CERT_LAC') && !e.tags.includes('LAB') && !e.tags.includes('CRM') && e.tags.includes('ALTA'));

    const ALTA_OFFLINE = this.provincia.statesListOfflineQ2PN.filter
      (e => !e.tags.includes('CERT_LAC') && !e.tags.includes('LAB') && !e.tags.includes('CRM') && e.tags.includes('ALTA'));

    const total = ALTA_ONLINE.length + ALTA_OFFLINE.length;
    console.log('TOTAL ALTA:' + total);

    const valor = Math.round(ALTA_ONLINE.length * 100 / total);
    if (valor > 0) {
      this.pieChartData = [];
      this.pieChartLabels = [];

      // this.pieChartData.push(valor);
      // this.pieChartData.push(100 - valor);

      this.pieChartLabels.push('Online ');
      this.pieChartLabels.push('Offline ');

      this.tags_online = [];
      this.tags_offline = [];

      this.tags_online = ALTA_ONLINE;
      this.tags_offline = ALTA_OFFLINE;

    }
  }

  filtro_LAB() {
    const LAB_ONLINE = this.provincia.statesListOnlineQ2PN.filter
      (e => !e.tags.includes('CERT_LAC') && e.tags.includes('LAB') && !e.tags.includes('CRM'));

    const LAB_OFFLINE = this.provincia.statesListOfflineQ2PN.filter
      (e => !e.tags.includes('CERT_LAC') && e.tags.includes('LAB') && !e.tags.includes('CRM'));

    const total = LAB_ONLINE.length + LAB_OFFLINE.length;
    console.log('TOTAL LAB:' + total);

    // const valor = Math.round(LAB_ONLINE.length * 100 / total);
    // if (valor > 0) {
    //   this.pieChartData = [];
    //   this.pieChartLabels = [];

    //   this.pieChartData.push(valor);
    //   this.pieChartData.push(100 - valor);

    //   this.pieChartLabels.push('Online ');
    //   this.pieChartLabels.push('Offline ');

    //   this.tags_online = [];
    //   this.tags_offline = [];

    //   this.tags_online = LAB_ONLINE;
    //   this.tags_offline = LAB_OFFLINE;
    // }
  }


  filtro_CRM() {

    const CRM_ONLINE = this.provincia.statesListOnlineQ2PN.filter
      (e => !e.tags.includes('CERT_LAC') && !e.tags.includes('LAB') && e.tags.includes('CRM'));

    const CRM_OFFLINE = this.provincia.statesListOfflineQ2PN.filter
      (e => !e.tags.includes('CERT_LAC') && !e.tags.includes('LAB') && e.tags.includes('CRM'));

    const total = CRM_ONLINE.length + CRM_OFFLINE.length;
    console.log('TOTAL CRM:' + total);

    // const valor = Math.round(CRM_ONLINE.length * 100 / total);
    // if (valor > 0) {
    //   this.pieChartData = [];
    //   this.pieChartLabels = [];

    //   this.pieChartData.push(valor);
    //   this.pieChartData.push(100 - valor);

    //   this.pieChartLabels.push('Online ');
    //   this.pieChartLabels.push('Offline ');

    //   this.tags_online = [];
    //   this.tags_offline = [];

    //   this.tags_online = CRM_ONLINE;
    //   this.tags_offline = CRM_OFFLINE;
    // }
  }


  filtro_CERT_LAC() {
    const CERT_LAC_ONLINE = this.provincia.statesListOnlineQ2PN.filter
      (e => !e.tags.includes('CERT_LAC') && !e.tags.includes('LAB') && !e.tags.includes('CRM') && e.tags.includes('ALTA'));

    const CERT_LAC_OFFLINE = this.provincia.statesListOfflineQ2PN.filter
      (e => !e.tags.includes('CERT_LAC') && !e.tags.includes('LAB') && !e.tags.includes('CRM') && e.tags.includes('ALTA'));

    const total = CERT_LAC_ONLINE.length + CERT_LAC_OFFLINE.length;
    console.log('TOTAL CERT_LAC:' + total);

    // const valor = Math.round(CERT_LAC_ONLINE.length * 100 / total);
    // if (valor > 0) {
    //   this.pieChartData = [];
    //   this.pieChartLabels = [];

    //   this.pieChartData.push(valor);
    //   this.pieChartData.push(100 - valor);

    //   this.pieChartLabels.push('Online ');
    //   this.pieChartLabels.push('Offline ');

    //   this.tags_online = [];
    //   this.tags_offline = [];

    //   this.tags_online = CERT_LAC_ONLINE;
    //   this.tags_offline = CERT_LAC_OFFLINE;
    // }

  }


  filtro_Z3() {
    const Z3_ONLINE = this.provincia.statesListOnlineQ2TN.filter
      (e => e.tags.includes('Z3'));

    const Z3_OFFLINE = this.provincia.statesListOfflineQ2TN.filter
      (e => e.tags.includes('Z3'));

    const total = Z3_ONLINE.length + Z3_OFFLINE.length;
    console.log('TOTAL Z3:' + total);

    // const valor = Math.round(Z3_ONLINE.length * 100 / total);
    // if (valor > 0) {
    //   this.pieChartData = [];
    //   this.pieChartLabels = [];

    //   this.pieChartData.push(valor);
    //   this.pieChartData.push(100 - valor);

    //   this.pieChartLabels.push('Online ');
    //   this.pieChartLabels.push('Offline ');

    //   this.tags_online = [];
    //   this.tags_offline = [];

    //   this.tags_online = Z3_ONLINE;
    //   this.tags_offline = Z3_OFFLINE;
    // }
  }


  onChange(centroId) {
    switch (centroId) {
      case 'alta': // Error: Fallthrough case in switch.
        this.filtro_ALTA();
        break;
      case 'lab':
        this.filtro_LAB();
        break;
      case 'crm':
        this.filtro_CRM();
        break;
      case 'cert_lac':
        this.filtro_CERT_LAC();
        break;
      case 'z3':
        this.filtro_Z3();
        break;
    }
  }
}
