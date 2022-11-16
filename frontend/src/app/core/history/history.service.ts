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

import { History } from "./history.models";
import { UserService } from "../user/user.service";
import { User} from "../user/user.model";
import {Quizz} from "../quizz/quizz.models";

@Injectable({
    providedIn: 'root'
})
export class HistoryService
{
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private _histories: BehaviorSubject<History[] | null> = new BehaviorSubject(null);
    private _historiesByUser: BehaviorSubject<History[] | null> = new BehaviorSubject(null);
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
     * Getter all histories
     */
    get histories$(): Observable<History[]>
    {
        return this._histories.asObservable();
    }

    /**
     * Getter for histories by user
     */
    get historiesByUser$(): Observable<History[]>
    {
        return this._historiesByUser.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all histories
     */
    getAll(): Observable<History[]>
    {
        return this._httpClient.get<any>(environment.backendUrl + 'histories/').pipe(
            tap((histories) => {
                if(histories) {
                    histories.forEach(quizz => {
                        let i = 1;
                        quizz.questions.forEach(question => {
                            question.position = i;
                            i ++;
                        });
                    });
                    this._histories.next(histories);
                }
            })
        );
    }

    /**
     * Get all histories by user id
     *
     */
    getAllByUserId(): Observable<History[]>
    {
        if(this.user && this.user.id){
            return this._httpClient.get<any>(environment.backendUrl + 'histories/user/'  + this.user.id).pipe(
                tap((histories) => {
                    if(histories) {
                        this._historiesByUser.next(histories);

                        return histories;
                    }
                })
            );
        }
    }

    /**
     * Get all histories by quizz id
     *
     * @param quizzId
     */
    getAllByQuizzId(quizzId): Observable<History[]>
    {
        return this._httpClient.get<any>(environment.backendUrl + 'histories/quizz/'  + quizzId).pipe(
            tap((histories) => {
                if(histories) {
                    this._histories.next(histories);

                    return histories;
                }
            })
        );
    }

    /**
     * Get all histories by User id and Quiz id
     * @param userId
     * @param quizzId
     */
    getAllByUserIdAndQuizzId(userId: string, quizzId: string): Observable<History[]>
    {
        return this._httpClient.get<any>(environment.backendUrl + 'histories/user/'  + userId + '/quizz/' + quizzId).pipe(
            tap((histories) => {
                if(histories) {
                    this._historiesByUser.next(histories);

                    return histories;
                }
            })
        );
    }

    /**
     * Create history
     */
    createHistory(points: number, time:number, quizzId :string): Observable<History>
    {
        return this.histories$.pipe(
            take(1),
            switchMap(histories =>
                this._httpClient.post<any>(environment.backendUrl + 'histories',
                    {
                        points   : points,
                        time     : time,
                        quizz_id : quizzId,
                        user_id  : this.user.id,
                    }
                ).pipe(
                    map((response) => {

                        if(response) {
                            // Update the challenges with the new challenge
                            this._historiesByUser.next([response, ...histories]);

                            // Return the new challenge from observable
                            return response;
                        }
                    })
                ))
        );
    }

}
