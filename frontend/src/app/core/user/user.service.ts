import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map, Observable, of, ReplaySubject, switchMap, tap, throwError} from 'rxjs';
import { User } from 'app/core/user/user.types';
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<any>
    {
        let token = localStorage.getItem('accessToken');

        // Renew token
        return this._httpClient.post(environment.backendUrl + 'check-authentication/' ,
            {
                token: token
            })
            .pipe(
                catchError((err) =>

                    // Return false
                    of(false)
                ),
                switchMap((response: any) => {

                    if (response) {
                        if (response.token) {

                            if(response.user) {
                                this._user.next(response.user);

                            }else{
                                this._user.error('User not found');
                            }

                            // Return true
                            return of(true);
                        }
                    }else{
                        // Return true
                        return of(false);
                    }

                })
            );
    }
}
