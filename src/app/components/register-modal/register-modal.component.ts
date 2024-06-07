import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { PesosService } from '../../services/pesos.service';


@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css'
})
export class RegisterModalComponent {
  registerForm!: FormGroup;
  errorMsg : string = "";
  confirmPasswordVisible: boolean = false;
  userExists: boolean = false;
  passwordsMismatch: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<RegisterModalComponent>, 
    private fb: FormBuilder,
    private _matDialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private pesosService : PesosService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      sexo: ['', Validators.required],
      peso: ['', [Validators.required, Validators.min(1)]],
      objetivo: ['', Validators.required],
      altura: ['', [Validators.required, Validators.min(1)]]
    });

    this.registerForm.statusChanges.subscribe(status => {
      console.log(status);
      console.log(this.registerForm.errors);
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.userExists = false;
    this.passwordsMismatch = false;

    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value;
      const nombre = this.registerForm.get('nombre')?.value;
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = this.registerForm.get('confirmPassword')?.value;
      const sexo = this.registerForm.get('sexo')?.value;
      const peso = this.registerForm.get('peso')?.value;
      const objetivo = this.registerForm.get('objetivo')?.value;
      const altura = this.registerForm.get('altura')?.value;

      if (password !== confirmPassword) {
        this.passwordsMismatch = true;
        this.errorMsg = "Las contraseñas no coinciden.";
        return;
      }

      this.userService.checkUserExists(email).subscribe(exists => {
        console.log(exists);
        if (exists.exists) {
          this.userExists = true;
          this.errorMsg = "Ya existe una cuenta con este correo."
        } else {
          const user = { email, password,nombre, sexo, peso, objetivo, altura };
          this.userService.register(user).subscribe(response => {
            console.log('Usuario registrado:', response);
            const nuevoUser = {
              correo : email,
              nombre: nombre,
              sexo: sexo,
              peso: peso,
              objetivo: objetivo,
              altura: altura
            }
            this.pesosService.registerPeso({id_usuario:nuevoUser.correo, peso:nuevoUser.peso, dia:new Date()}).subscribe(
              result => {
                this.userService.loginUser(nuevoUser);
              console.log(this.userService.getUser());
              this.router.navigate(['/dashboard']);
              this.closeDialog();
              },
              error => {
                console.log(error);
              }
            )
            this.userService.loginUser(nuevoUser);
            console.log(this.userService.getUser());
            this.router.navigate(['/dashboard']);
            this.closeDialog();
          }, error => {
            console.error('Error al registrar usuario:', error);
          });
        }
      }, error => {
        console.error('Error al verificar usuario:', error);
      });
    }
  }

  closeAndOpenLoginModal(){
    this.dialogRef.close();
    this._matDialog.open(LoginModalComponent, {
      width: '660px',
      height: '500px'
    })
  }

  reloadPage(): void {
    window.location.reload();
  }
}