import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapaComponent } from './share/mapa/mapa.component';
import { ProvinciasComponent } from './share/provincias/provincias.component';
import { ProvinciaComponent } from './share/provincia/provincia.component';


export const routes: Routes = [
  // { path: 'organizaciones', component: OrganizacionTableComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'provincias', component: ProvinciasComponent },
  { path: 'provincia/:idOrg', component: ProvinciaComponent },
  { path: '**', redirectTo: 'mapa', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MapaComponent, ProvinciasComponent, ProvinciaComponent];
