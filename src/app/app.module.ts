import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import 'hammerjs';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapaComponent } from './share/mapa/mapa.component';
import { ProvinciaComponent } from './share/provincia/provincia.component';
import { ProvinciasComponent } from './share/provincias/provincias.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatSelectModule, MatExpansionModule, MatFormFieldModule,
  MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatCardModule
} from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MapaComponent,
    ProvinciaComponent,
    ProvinciasComponent
  ],
  imports: [
    AppRoutingModule, FormsModule,
    BrowserModule, HttpClientModule, MatFormFieldModule,
    BrowserAnimationsModule, MatExpansionModule,
    MatButtonModule, MatCheckboxModule,
    MatSidenavModule, MatToolbarModule, MatTableModule,
    MatIconModule, MatCardModule, MatSelectModule, ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
