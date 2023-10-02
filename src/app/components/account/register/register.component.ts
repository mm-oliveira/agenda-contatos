import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CriarContaRequestModel } from 'src/app/models/usuarios/criarconta-request.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatchPasswordValidator } from 'src/app/validators/match-password.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(
    private usuariosService: UsuariosService,
    private ngxSpinnerService: NgxSpinnerService,
  ) {
  }

  formRegister = new FormGroup(
    {
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
      ]),

      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      
      senha: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      ]),
      
      senhaConfirmacao: new FormControl('', [
        Validators.required,
      ]),
    },
    
    {
      validators: [MatchPasswordValidator.matchPassword],
    }
  );
  
  get form(): any {
    return this.formRegister.controls;
  }
  
  onSubmit(): void {   
    this.ngxSpinnerService.show();
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    const model: CriarContaRequestModel = {
      nome: this.formRegister.value.nome as string,
      email: this.formRegister.value.email as string,
      senha: this.formRegister.value.senha as string,
    };


    this.usuariosService.criarConta(model)
      .subscribe({
        next: (response) => {
          this.mensagemSucesso = `Parabéns, ${response.nome}! Sua conta foi criada com sucesso.`;
          this.formRegister.reset();
        },
        error: (e) => {
          this.mensagemErro = e.error.message;
        }
      }).add(() => {
        this.ngxSpinnerService.hide();
      });
  }
}




