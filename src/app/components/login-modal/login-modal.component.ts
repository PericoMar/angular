import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  loginForm!: FormGroup;
  passwordFieldType: string = 'password';
  errorMsg : string = "";

  constructor(
    private dialogRef: MatDialogRef<LoginModalComponent>, 
    private fb: FormBuilder,
    private _matDialog: MatDialog,
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.validateCredentials(email, password).subscribe(
        user => {
          console.log('Usuario logueado:', user);
          this.userService.loginUser(user);
          this.reloadPage();
          this.dialogRef.close();
        },
        error => {
          console.log(error);
          this.errorMsg = "Credenciales incorrectas";
        }
      );
    }
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  closeAndOpenRegisterModal(){
    this.dialogRef.close();
    this._matDialog.open(RegisterModalComponent, {
      width: '600px',
      height: '600px'
    })
  }
  reloadPage(): void {
    window.location.reload();
  }
}
