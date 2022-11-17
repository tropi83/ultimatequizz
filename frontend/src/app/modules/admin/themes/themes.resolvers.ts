import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import {catchError, forkJoin, merge, Observable, throwError} from 'rxjs';
import { ThemeService } from 'app/core/theme/theme.service';
import { Theme } from 'app/core/theme/theme.types';
import { Pagination } from "../../../core/pagination/pagination-types";


@Injectable({
    providedIn: 'root'
})

@Injectable({
    providedIn: 'root'
})
export class ThemeResolver implements Resolve<any>
{

    /**
     * Constructor
     */
    constructor(
        private _themeService: ThemeService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Theme>
    {
        return this._themeService.getThemeById(route.paramMap.get('id'))
                   .pipe(
                       // Error here means the requested theme is not available
                       catchError((error) => {

                           // Log the error
                           console.error(error);

                           // Get the parent url
                           const parentUrl = state.url.split('/').slice(0, -1).join('/');

                           // Navigate to there
                           this._router.navigateByUrl(parentUrl);

                           // Throw an error
                           return throwError(error);
                       })
                   );
    }
}

@Injectable({
    providedIn: 'root'
})
export class ThemesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _themeService: ThemeService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: Pagination; themes: Theme[] }>
    {
        const themeId = route.paramMap.get('themeId');

        if(themeId === undefined || themeId === null){
            return this._themeService.getFilteredThemes(0, 10, 'name', 'asc', "");
        }else {
            return this._themeService.getFilteredThemes(0, 10, 'name', 'asc', themeId);
        }

    }
}


