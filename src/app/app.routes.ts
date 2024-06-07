import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RecetasComponent } from './pages/recetas/recetas.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Ruta vacía dirige al componente HomeComponent
    { path: 'dashboard' , component: DashboardComponent},
    { path: 'recepies' , component: RecetasComponent}
  ];