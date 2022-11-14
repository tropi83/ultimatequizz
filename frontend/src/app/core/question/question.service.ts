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

import {cloneDeep} from "lodash-es";
import {Question} from "./question.models";
import {UserService} from "../user/user.service";
import {User} from "../user/user.model";

@Injectable({
    providedIn: 'root'
})
export class QuestionService
{
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private _questions: BehaviorSubject<Question[] | null> = new BehaviorSubject(null);
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
     * Getter for questions
     */
    get questions$(): Observable<Question[]>
    {
        return this._questions.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all questions order by creation date
     */
    getAll(): Observable<Question[]>
    {
        return this._httpClient.get<any>(environment.backendUrl + 'questions/').pipe(
            tap((questions) => {
                if(questions) {
                    this._questions.next(questions);
                }
            })
        );
    }


    /**
     * Get all questions order by like
     */
    getAllByLike(sort = 'desc'): Observable<Question[]>
    {
        return this._httpClient.get<any>(environment.backendUrl + 'Defis/Utilisateur/'  + this.user.id + '/Like/' + sort).pipe(
            tap((questions) => {
                if(questions) {
                    this._questions.next(questions);

                    return questions;
                }
            })
        );
    }


    /**
     * Create question
     */
    createQuestion(name: string, description :string): Observable<Question>
    {
        return this.questions$.pipe(
            take(1),
            switchMap(questions =>
                this._httpClient.post<any>(environment.backendUrl + 'Defis',
                    {
                        nom         : name,
                        description  : description,
                        utilisateurId  : this.user.id,
                        }
                ).pipe(
                    map((response) => {

                        if(response) {
                            // Update the questions with the new question
                            this._questions.next([response, ...questions]);

                            // Return the new question from observable
                            return response;
                        }
                    })
                ))
        );
    }

    /**
     * Delete question
     *
     * @param question
     */
    deleteQuestion(question): Observable<boolean>
    {
        return this.questions$.pipe(
            take(1),
            switchMap(questions => this._httpClient.delete(environment.backendUrl + 'Defis/' + question.id, ).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted question
                    const index = questions.findIndex(item => item.id === question.id);

                    // Delete the question
                    questions.splice(index, 1);

                    // Update the questions
                    this._questions.next(questions);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

}
