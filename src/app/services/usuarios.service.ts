import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { CriarContaResponseModel } from "../models/usuarios/criarconta-response.model";
import { CriarContaRequestModel } from "../models/usuarios/criarconta-request.model";
import { Injectable } from "@angular/core";
import { AutenticarRequestModel } from "../models/usuarios/autenticar-request.model";
import { AutenticarResponseModel } from "../models/usuarios/autenticar-response.model";

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    constructor(
        private httpClient: HttpClient
    ) { }

    criarConta(model: CriarContaRequestModel): Observable<CriarContaResponseModel> {
        return this.httpClient.post<CriarContaResponseModel>(environment.apiContatos + "/criar-conta", model);
    }

    autenticar(model: AutenticarRequestModel): Observable<AutenticarResponseModel> {
        return this.httpClient.post<AutenticarResponseModel>(environment.apiContatos + '/autenticar', model);
    }
}