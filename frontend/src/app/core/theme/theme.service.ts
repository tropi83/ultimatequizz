import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { environment } from "../../../environments/environment";
import { Theme } from "./theme.models";
import { Pagination } from "../pagination/pagination-types";
import {cloneDeep} from "lodash-es";

@Injectable({
    providedIn: 'root'
})
export class ThemeService
{
    private _pagination: BehaviorSubject<Pagination | null> = new BehaviorSubject(null);
    private _theme: BehaviorSubject<Theme | null> = new BehaviorSubject(null);
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
     * Getter for pagination
     */
    get pagination$(): Observable<Pagination>
    {
        return this._pagination.asObservable();
    }

    /**
     * Getter for themes
     */
    get themes$(): Observable<Theme[]>
    {
        return this._themes.asObservable();
    }

    /**
     * Getter for theme
     */
    get theme$(): Observable<Theme>
    {
        return this._theme.asObservable();
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

    /**
     * Get theme by id
     */
    getThemeById(id: string, fromExecLog = false): Observable<Theme>
    {

        return this._themes.pipe(
            take(1),
            map((themes) => {

                // Find the theme
                let theme;
                if(fromExecLog){
                    theme = themes.find(item => item.id.toString() === id) || null;
                }else {
                    theme = themes.find(item => item.id === id) || null;
                }

                // Update the theme
                this._theme.next(theme);

                // Return the theme
                return theme;
            }),
            switchMap((theme) => {

                if ( !theme )
                {
                    return throwError('Could not found theme with id of ' + id + '!');
                }

                return of(theme);
            })
        );
    }


    /**
     * Get themes (filters executed client side)
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getFilteredThemes(page: number = 0, size: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ pagination: Pagination; themes: Theme[] }>
    {
        return this._httpClient.get<any>(environment.backendUrl + 'themes/', {
        }).pipe(
            tap(((response) => {
                    // Clone the themes
                    let themes: any | null = cloneDeep(response);

                    // Sort the themes
                    if (sort === 'name') {
                        themes.sort((a, b) => {
                            const fieldA = a[sort].toString().toUpperCase();
                            const fieldB = b[sort].toString().toUpperCase();
                            return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
                        });
                    } else {
                        themes.sort((a, b) => order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]);
                    }

                    // If search exists...
                    if (search) {
                        // Filter the themes

                        if ((typeof search === "number")) {
                            search = search;
                            let searchId = search.toString();
                            // Find By Id
                            themes = themes.filter(theme => theme.id && theme.id.toString() === searchId);
                        } else if ((typeof search === "string")) {
                            const regexOnlyNumber = new RegExp('^[0-9]+$');
                            const foundNumber = search.match(regexOnlyNumber);
                            if (foundNumber) {
                                // Find By Id
                                themes = themes.filter(theme => theme.id && theme.id.toString() === search);
                            } else {
                                // Find By Name
                                let resultThemes= themes.filter(theme => theme.name && theme.name.toLowerCase().includes(search.toLowerCase()));
                                themes = resultThemes;

                            }
                        }

                    }

                    // Paginate - Start
                    const themesLength = themes.length;

                    // Calculate pagination edit
                    const begin = page * size;
                    const end = Math.min((size * (page + 1)), themesLength);
                    const lastPage = Math.max(Math.ceil(themesLength / size), 1);

                    // Prepare the pagination object
                    let pagination: Pagination = {
                        length: themesLength,
                        size: size,
                        page: page,
                        lastPage: lastPage,
                        startIndex: begin,
                        endIndex: end - 1
                    };

                    // If the requested page number is bigger than
                    // the last possible page number, return null for
                    // themes but also send the last possible page so
                    // the app can navigate to there
                    if (page > lastPage) {
                        themes = null;
                    } else {
                        // Paginate the results by size
                        themes = themes.slice(begin, end);
                    }

                    this._pagination.next(pagination);
                    this._themes.next(themes);

                    return pagination && themes;


            }))
        );

    }

    /**
     * Create theme
     */
    createTheme(): Observable<Theme>
    {
        // Generate a new theme
        const newTheme= {
            name       : this.makeid(77),
        };
        return this.themes$.pipe(
            take(1),
            switchMap(themes =>
                this._httpClient.post<any>(environment.backendUrl  + 'themes/' , newTheme).pipe(
                    map((theme) => {

                        if (theme) {
                            // Update the themes with the new theme
                            this._themes.next([theme, ...themes]);

                            // Return the new theme from observable
                            return theme;
                        }
                    })
                ))
        );
    }

    /**
     * Update theme
     *
     * @param id
     * @param theme
     */
    updateTheme(id: string, theme: Theme): Observable<Theme>
    {
        return this.themes$.pipe(
            take(1),
            switchMap(themes => this._httpClient.put<any>(environment.backendUrl + 'themes/' + id, {
                name: theme?.name
            }).pipe(
                map((theme) => {

                    if (theme) {
                        // Find the index of the updated theme
                        const index = themes.findIndex(item => item.id === id);

                        // Update the theme
                        themes[index] = theme;

                        // Update the themes
                        this._themes.next(themes);

                        // Return the updated theme
                        return theme;
                    }

                })
            ))
        );
    }

    /**
     * Delete the theme
     *
     * @param id
     */
    deleteTheme(id: string): Observable<boolean>
    {
        return this.themes$.pipe(
            take(1),
            switchMap(themes => this._httpClient.delete(environment.backendUrl + 'themes/' + id, ).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted theme
                    const index = themes.findIndex(item => item.id === id);

                    // Delete the theme
                    themes.splice(index, 1);

                    // Update the themes
                    this._themes.next(themes);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    makeid(length) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

}
