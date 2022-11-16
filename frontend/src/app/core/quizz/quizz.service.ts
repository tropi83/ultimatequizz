import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    BehaviorSubject,
    map,
    Observable,
    Subject,
    switchMap,
    take, takeUntil,
    tap,
} from 'rxjs';
import { environment } from "../../../environments/environment";

import { Quizz } from "./quizz.models";
import { UserService } from "../user/user.service";
import { User } from "../user/user.model";
import {History} from "../history/history.models";

@Injectable({
    providedIn: 'root'
})
export class QuizzService
{
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private _quizzs: BehaviorSubject<Quizz[] | null> = new BehaviorSubject(null);
    user: User;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient,
                private _userService: UserService)
    {
        // Subscribe to user changes
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;

            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for quizzs
     */
    get quizzs$(): Observable<Quizz[]>
    {
        return this._quizzs.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all quizzs
     *
     * @param sort
     */
    getAll(sort: string = 'desc'): Observable<Quizz[]>
    {
        return this._httpClient.get<any>(environment.backendUrl + 'quizzs/' + sort).pipe(
            tap((quizzs) => {
                if(quizzs) {
                    quizzs.forEach(quizz => {
                        let i = 1;
                        quizz.questions.forEach(question => {
                            question.position = i;
                            i ++;
                        });
                    });
                    this._quizzs.next(quizzs);
                }
            })
        );
    }

    /**
     * Get all quizzs by theme
     *
     * @param themeId
     */
    getAllByTheme(themeId): Observable<Quizz[]>
    {
        if(themeId === 'all'){
            return this.getAll();
        }

        return this._httpClient.get<any>(environment.backendUrl + 'quizzs/theme/' + themeId).pipe(
            tap((quizzs) => {
                if(quizzs) {
                    quizzs.forEach(quizz => {
                        let i = 1;
                        quizz.questions.forEach(question => {
                            question.position = i;
                            i ++;
                        });
                    });
                    this._quizzs.next(quizzs);
                }
            })
        );
    }

    /**
     * Get all histories by User id and Quiz id
     *
     * @param userId
     */
    getAllRealised(userId: string): Observable<Quizz[]>
    {
        return this._httpClient.get<any>(environment.backendUrl + 'histories/user/'  + userId).pipe(
            tap((histories) => {
                if(histories) {
                    let quizzs: Quizz[] = [];
                    histories.forEach( history => {
                        quizzs.push(history.quizz);
                    })

                    this._quizzs.next(quizzs);

                    return quizzs;
                }
            })
        );
    }


    /**
     * Realised quizz (Add history)
     *
     * @param quizz
     */
    realisedQuizz(quizz): Observable<Quizz>
    {
        return this.quizzs$.pipe(
            take(1),
            switchMap(quizzs =>
                this._httpClient.post<any>(environment.backendUrl + 'history-quizz',
                    {
                        defiId  : quizz.id,
                        utilisateurId  : this.user.id,
                    }
                ).pipe(
                    map((response) => {
                        if(response) {
                            // Get the quizzs value
                            const quizzs1 = this._quizzs.value;

                            // Find the index of the updated quizz
                            const indexQuizz = quizzs1.findIndex(item => item.id === quizz.id);

                            // Update the comments
                            quizzs1[indexQuizz].realise = false;
                            quizzs1[indexQuizz].realiseId = response.id;

                            // Update the quizz
                            this._quizzs.next(quizzs1);

                            return quizzs1;
                        }else{
                            return response;
                        }
                    })
                ))
        );
    }

    /**
     * Create comment
     *
     * @param text
     * @param userId
     * @param quizzId
     */
    createComment(text: string, userId :string, quizzId :string): Observable<Comment>
    {
        return this.quizzs$.pipe(
            take(1),
            switchMap(comments =>
                this._httpClient.post<any>(environment.backendUrl + 'comments',
                    {
                        text          : text,
                        user_id       : this.user.id,
                        quizz_id      : quizzId
                        }
                ).pipe(
                    map((response) => {

                        if(response) {

                            // Get the quizzs value
                            const quizzs1 = this._quizzs.value;

                            // Find the index of the updated quizz
                            const indexQuizz = quizzs1.findIndex(item => item.id === quizzId);

                            // Update the comments
                            quizzs1[indexQuizz].comments.unshift(response);

                            // Return the new quizz from observable
                            return response;
                        }
                    })
                ))
        );
    }


}
