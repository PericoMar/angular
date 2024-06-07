import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { AgChartsAngular } from "ag-charts-angular";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PesosService } from '../../services/pesos.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AgChartsAngularModule, RouterModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user : any = {
    nombre : "Pedro",
    sexo: "male",
    peso: "80",
    altura: "182",
    objetivo: "Ganar masa muscular",
  }

  pesos: any[] = [];
  public options! : AgChartOptions;
  public weightForm: FormGroup;
  

  constructor(private fb: FormBuilder, private pesosService : PesosService, private userService : UserService) {
    this.user = this.userService.getUser();
    this.pesosService.getPesosByUser(this.user.correo).subscribe(
      data => {
        this.pesos = data.sort((a : any, b : any) => new Date(b.dia).getTime() - new Date(a.dia).getTime());
        console.log(this.pesos)
        this.options = {
          title: {
            text: "Control del peso",
          },
          series: [
            {
              data: this.getPesos(),
              xKey: "dia",
              yKey: "peso",
              yName: this.user.nombre,
            }
          ],
          axes: [
            {
              type: "time",
              position: "bottom",
            },
            {
              type: "number",
              position: "left",
              label: {
                format: "#{.1f} Kg",
              },
            },
          ],
        };
      },
      error => {
        console.log(error);
        
      }
    )
    this.weightForm = this.fb.group({
      newWeight: ['', [Validators.required, Validators.min(1)]]
    });
    
  }

  updateChartOptions(){
    window.location.reload();
  }

  getObjetivo(): string {
    // Obtener el objetivo del usuario (aquí supongo que está almacenado en this.user.objetivo)
    let objetivo = this.user.objetivo;
  
    // Reemplazar guiones bajos con espacios y convertir a mayúsculas
    objetivo = objetivo.replace(/_/g, ' ').toUpperCase();
  
    return objetivo;
  }

  addWeight() {
    if (this.weightForm.valid) {
      const newWeight = this.weightForm.value.newWeight;
      const newEntry = { id_usuario: this.user.correo, peso: newWeight, dia: new Date() };
      this.pesosService.registerPeso(newEntry).subscribe(
        result => {
          this.updateChartOptions();
        }, error => {
          console.log(error);
        }
      )
      this.weightForm.reset();
    }
  }

  getPesos(){
    console.log(this.pesos);
    return this.pesos.map(peso => ({
      peso: parseFloat(peso.peso),
      dia: new Date(peso.dia)  // Convertir a objeto Date
    }));
  }

}
