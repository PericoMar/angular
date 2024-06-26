import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../../components/login-modal/login-modal.component';
import { RegisterModalComponent } from '../../components/register-modal/register-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  images: any = ["../../../assets/comida.jpg", "../../../assets/cambiar.jpg", "../../../assets/deporte.jpg"];

  constructor(private _matDialog: MatDialog){}

  abrirModalLogin():void{
    this._matDialog.open(LoginModalComponent, {
      width: '500px',
      height: '500px'
    });
  }

  abrirModalRegister(): void{
    this._matDialog.open(RegisterModalComponent, {
      width: '1000px',
      height: '1000px'
    })
  }
}
