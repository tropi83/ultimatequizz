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
     */
    getAll(sort: string = 'asc'): Observable<Quizz[]>
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
     * Get all histories by User id and Quiz id
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
     * Get all quizzs order by like
     */
    getAllByLike(sort = 'desc'): Observable<Quizz[]>
    {
        return this._httpClient.get<any>(environment.backendUrl + 'Defis/Utilisateur/'  + this.user.id + '/Like/' + sort).pipe(
            tap((quizzs) => {
                if(quizzs) {
                    this._quizzs.next(quizzs);

                    return quizzs;
                }
            })
        );
    }

    /**
     * Like quizz
     */
    likeQuizz(quizz): Observable<Quizz>
    {
        return this.quizzs$.pipe(
            take(1),
            switchMap(quizzs =>
                this._httpClient.post<any>(environment.backendUrl + 'like',
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

                            // Update the like state
                            quizzs1[indexQuizz].like = false;
                            quizzs1[indexQuizz].likeId = response.id;

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
     * UnLike quizz
     */
    unlikeQuizz(quizz): Observable<Quizz>
    {
        return this.quizzs$.pipe(
            take(1),
            switchMap(quizzs =>
                this._httpClient.delete<any>(environment.backendUrl + 'like/' + quizz.likeId,
                ).pipe(
                    map((response) => {

                        if(response) {
                            // Get the quizzs value
                            const quizzs1 = this._quizzs.value;

                            // Find the index of the updated quizz
                            const indexQuizz = quizzs1.findIndex(item => item.id === quizz.id);

                            // Update the like state
                            quizzs1[indexQuizz].like = true;

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
     * Realised quizz
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
     * UnRealised quizz
     */
    unrealisedQuizz(quizz): Observable<Quizz>
    {
        return this.quizzs$.pipe(
            take(1),
            switchMap(quizzs =>
                this._httpClient.delete<any>(environment.backendUrl + 'history-quizz/' + quizz.realiseId,
                ).pipe(
                    map((response) => {

                        if(response) {
                            // Get the quizzs value
                            const quizzs1 = this._quizzs.value;

                            // Find the index of the updated quizz
                            const indexQuizz = quizzs1.findIndex(item => item.id === quizz.id);

                            // Update the like state
                            quizzs1[indexQuizz].realise = true;

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
     */
    createComment(text: string, quizzId :string): Observable<Quizz>
    {
        return this.quizzs$.pipe(
            take(1),
            switchMap(quizzs =>
                this._httpClient.post<any>(environment.backendUrl + 'comments',
                    {
                        text          : text,
                        defiId        : quizzId,
                        utilisateurId : this.user.id,
                        }
                ).pipe(
                    map((response) => {

                        if(response) {

                            // Get the quizzs value
                            const quizzs1 = this._quizzs.value;

                            // Find the index of the updated quizz
                            const indexQuizz = quizzs1.findIndex(item => item.id === quizzId);

                            // Update the comments
                            quizzs1[indexQuizz].comments.push(response);

                            // Update the quizz
                            this._quizzs.next(quizzs1);

                            // Update the quizzs with the new quizz
                            this._quizzs.next([response, ...quizzs]);

                            // Return the new quizz from observable
                            return response;
                        }
                    })
                ))
        );
    }


}
