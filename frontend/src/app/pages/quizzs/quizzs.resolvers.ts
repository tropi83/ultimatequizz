import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { QuizzService } from "../../core/quizz/quizz.service";
import { Quizz } from "../../core/quizz/quizz.models";
import { ThemeService } from "../../core/theme/theme.service";
import { Theme } from "../../core/theme/theme.types";
import { HistoryService } from "../../core/history/history.service";


@Injectable({
    providedIn: 'root'
})
export class QuizzResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _quizzService: QuizzService,
        private _router: Router
    ){}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Quizz[]>
    {

        return this._quizzService.getAll('desc')
            .pipe(
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
export class QuizzThemesResolver implements Resolve<any>
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Theme[]>
    {
        return this._themeService.getAll();
    }
}

@Injectable({
    providedIn: 'root'
})
export class QuizzHistoryByUserResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _historyService: HistoryService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<History[]>
    {
        // @ts-ignore
        return this._historyService.getAllByUserId();
    }
}


