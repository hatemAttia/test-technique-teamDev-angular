import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import {
  HttpHeaders,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Filiere } from '../models/filiere';

@Injectable({
  providedIn: 'root',
})
export class FiliereService {
  path: string;
  constructor(private http: HttpClient) {
    this.path = environment.path;
   
  }

  /**
   * traitement Erreur
   * @param erreur
   */
  traitementErreur(erreur: HttpErrorResponse) {
    if (erreur.error instanceof ErrorEvent) {
      console.log('Une erreur s est produite', erreur.error.message);
    } else
      console.error(
        'code renvoyé par le backen ' +
          erreur.status +
          +'le corps était : ' +
          JSON.stringify(erreur.error)
      );
    return throwError(
      'quelque chose est arrivé ; Veuillez reessayer plus tard'
    );
  }

  /**
   * get list of groups teacher
   * @returns
   */
  getgroupsEnseignenement() {
    return this.http
      .get(this.path + 'g-enseignement')
      .pipe(retry(2), catchError(this.traitementErreur));
  }

  /**
   * get list Filiers
   * @returns
   */
  getFilieres() {
    return this.http
      .get(this.path + 'filiere')
      .pipe(retry(2), catchError(this.traitementErreur));
  }

  /**
   * get list Filiers
   * @returns
   */
   getGroups() {
    return this.http
      .get(this.path + 'groupes')
      .pipe(retry(2), catchError(this.traitementErreur));
  }

  /**
   * add filiere
   * @param data
   * @returns
   */
  addFiliere(data: any) {
    return this.http
      .post(this.path + 'filiere', data)
      .pipe(retry(2), catchError(this.traitementErreur));
  }

  updateFiliere(data: any, id: number) {
    return this.http
      .put(this.path + 'filiere/' + id, data)
      .pipe(retry(2), catchError(this.traitementErreur));
  }

  deleteFiliere(id: number) {
    return this.http
      .delete(this.path + 'filiere/' + id)
      .pipe(retry(2), catchError(this.traitementErreur));
  }

}
