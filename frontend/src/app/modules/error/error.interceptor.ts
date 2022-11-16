import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {EMPTY, Observable, throwError} from 'rxjs';
import {catchError, timeout} from 'rxjs/operators';
import {Router} from '@angular/router';
import { FlashService } from "../flash/flash.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private _router: Router,
        private _flashService: FlashService,
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {
            if ([0, 400, 404, 422, 500, 502].indexOf(err.status) !== -1) {

                if (err.status === 0){

                    let messageError = "Serveur injoignable";
                    this._flashService.error(messageError);

                    this._router.navigate(['500']).then();

                } else if(err.status === 400){
                    const errors = err.error.message || err.statusText;
                    this._flashService.warn(errors);

                }  else if(err.status === 404){
                    const errors = err.error.message  || err.statusText;
                    this._flashService.error(errors);

                } else if(err.status === 422){
                    const errors = err.error.violations || err.statusText;
                    let messageError = "Veuillez corriger les erreurs suivantes: \n";
                    errors.forEach(error => {
                        messageError += '"'+ error.propertyPath + '"' + ': ' + error.message + '\n';
                    })
                    this._flashService.error(messageError);

                } else if(err.status === 502){
                    const errors = err.error.violations || err.statusText;
                    let messageError = "Serveur injoignable";
                    this._flashService.error(messageError);

                }else {
                    const error = err.error.error || err.statusText;
                    this._flashService.error('Erreur ' + err.status + ': ' + error);
                }
            }
            return throwError(err);
        }));
    }
}
