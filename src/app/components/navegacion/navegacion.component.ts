import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css'
})
export class NavegacionComponent {
  constructor(private _matDialog : MatDialog){}

  openModalLogin():void{
    this._matDialog.open(LoginModalComponent, {
      width: '500px',
      height: '500px'
    });
  }

  openModalRegister(): void{
    this._matDialog.open(RegisterModalComponent, {
      width: '1000px',
      height: '1000px'
    })
  }
}
