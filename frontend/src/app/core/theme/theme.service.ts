import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    BehaviorSubject,
    Observable,
    tap,
} from 'rxjs';
import { environment } from "../../../environments/environment";
import { Theme } from "./theme.models";

@Injectable({
    providedIn: 'root'
})
export class ThemeService
{
    private _themes: BehaviorSubject<Theme[] | null> = new BehaviorSubject(null);

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
     * Getter for themes
     */
    get themes$(): Observable<Theme[]>
    {
        return this._themes.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all themes
     */
    getAll(): Observable<Theme[]>
    {
        return this._httpClient.get<any>(environment.backendUrl + 'themes/').pipe(
            tap((themes) => {
                if(themes) {
                    this._themes.next(themes);
                }
            })
        );
    }

}
