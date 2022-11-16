import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { FlashService } from "../../modules/flash/flash.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _flashService: FlashService,
    )
    {
    }

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        // Clone the request object
        let newReq = req.clone();

        // Request
        //
        // If the access token didn't expire, add the Authorization header.
        // We won't add the Authorization header if the access token expired.
        // This will force the server to return a "401 Unauthorized" response
        // for the protected API routes which our response interceptor will
        // catch and delete the access token from the local storage while logging
        // the user out from the app.

        if ( this._authService.accessToken && !AuthUtils.isTokenExpired(this._authService.accessToken) )
        {
            newReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this._authService.accessToken)
            });

        }

        // Response
        return next.handle(newReq).pipe(
            catchError((error) => {

                // Catch "401 Unauthorized" responses
                if ( error instanceof HttpErrorResponse && error.status === 401 )
                {
                    // Sign out
                    this._authService.signOut();

                    this._flashService.warn('Déconnexion');

                }

                // Catch "403 Forbidden" responses
                if ( error instanceof HttpErrorResponse && error.status === 403 )
                {
                    const errorMessage = error.error.message || error.statusText;

                    if(errorMessage === "Inactive user."){
                        this._flashService.error('Erreur ' + error.status + ': Utilisateur désactivé.');
                    }else if(errorMessage === "User must be change password."){
                        this._flashService.error('Erreur ' + error.status + ': Le mot de passe doit être changé. Veuillez consulter vos email ou faire un renouvellement de mot de passe.');
                    }

                }

                return throwError(error);
            })
        );
    }
}
