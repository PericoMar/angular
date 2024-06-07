import { Component } from '@angular/core';
import { RecetasService } from '../../services/recetas.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [],
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css'
})
export class RecetasComponent {
  user!: any;
  recetas! : any;

  constructor(
    private recetasService : RecetasService,
    private userService : UserService
  ){
    this.user = this.userService.getUser()
    this.recetasService.getRecetasByObjetivo(this.user.objetivo).subscribe(
      recetas => {
        this.recetas = recetas;
      },
      error => {
        console.log(error);
      }
    )
  }

  getObjetivo(): string {
    // Obtener el objetivo del usuario (aquí supongo que está almacenado en this.user.objetivo)
    let objetivo = this.user.objetivo;
  
    // Reemplazar guiones bajos con espacios y convertir a mayúsculas
    objetivo = objetivo.replace(/_/g, ' ').toUpperCase();
  
    return objetivo;
  }
}
