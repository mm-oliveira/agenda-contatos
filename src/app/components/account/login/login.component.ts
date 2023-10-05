import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationHelper } from 'src/app/helpers/authentication.helper';
import { AutenticarRequestModel } from 'src/app/models/usuarios/autenticar-request.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  mensagemErro: string = '';

  constructor(
    private usuariosService: UsuariosService,
    private authenticationHelper: AuthenticationHelper,
    private ngxSpinnerService: NgxSpinnerService
  ) {
  }

  formLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    ]),
  });

  get form(): any {
    return this.formLogin.controls;
  }

  onSubmit(): void {
    this.ngxSpinnerService.show();
    const model: AutenticarRequestModel = {
      email: this.formLogin.value.email as string,
      senha: this.formLogin.value.senha as string,
    };
    this.usuariosService.autenticar(model)
      .subscribe({
        next: (response) => {
          //gravar os dados do usuário autenticado
          this.authenticationHelper.signIn(response);
          
          window.location.href = "/admin/dashboard";
        },
        error: (e) => {
          this.mensagemErro = e.error.message;
        },
      })
      .add(() => {
        this.ngxSpinnerService.hide();
      });
  }
}
