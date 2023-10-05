import { AbstractControl } from '@angular/forms';

export class MatchPasswordValidator {
    
    static matchPassword(abstractControl: AbstractControl) {
        let senha = abstractControl.get('senha')?.value;
        let senhaConfirmacao = abstractControl.get('senhaConfirmacao')?.value;

        if (senhaConfirmacao.length > 0 && senhaConfirmacao != senha) {
            abstractControl.get('senhaConfirmacao')?.setErrors({
                matchPassword: true,
            });
        }

        return null;
    }
}
