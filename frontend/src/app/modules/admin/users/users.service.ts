import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { environment } from "../../../../environments/environment";
import { User } from "../../../core/user/user.types";

@Injectable({
    providedIn: 'root'
})
export class UsersService
{
    // Private
    private _user: BehaviorSubject<User | null> = new BehaviorSubject(null);
    private _users: BehaviorSubject<User[] | null> = new BehaviorSubject(null);
    private _backendUrlUser: string = 'users/';

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
     * Getter for user
     */
    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }

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

    /**
     * Getter for users
     */
    get users$(): Observable<User[]>
    {
        return this._users.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get users
     */
    getUsers(): Observable<User[]>
    {
        return this._httpClient.get<any>(environment.backendUrl + this._backendUrlUser).pipe(
            tap((users) => {
                if(users){
                    this._users.next(users);
                }
            })
        );
    }

    /**
     * Search users with given query
     *
     * @param query
     */
    searchUsers(query: string): Observable<User[]>
    {

            return this._httpClient.get<any>(environment.backendUrl + this._backendUrlUser, {
            }).pipe(
                tap((users) => {

                    if(users){

                        console.log(users)

                        // Filter the users
                        let resultUsers = users.filter(user => user.username && user.username.toLowerCase().includes(query.toLowerCase()));

                        // if username is find
                        if(resultUsers && resultUsers > 0){
                            users.sort((a, b) => a.username.localeCompare(b.username));
                        }else{
                            resultUsers = users.filter(user => user.email && user.email.toLowerCase().includes(query.toLowerCase()));
                            users.sort((a, b) => a.email.localeCompare(b.email));
                        }

                        // Return the response
                        this._users.next(resultUsers);

                        return resultUsers;
                    }
                })
            );

    }

    /**
     * Search one user with given query
     *
     * @param query
     */
    searchUser(query: string): Observable<User>
    {
        if ( query )
        {
            return this._httpClient.get<any>(environment.backendUrl + this._backendUrlUser + 'search/' + query, {
            }).pipe(
                tap((user) => {
                    if (user ){
                        return user;
                    }
                })
            );
        }
    }

    /**
     * Get user by id
     */
    getUserById(id: string): Observable<User>
    {
        return this._users.pipe(
            take(1),
            map((users) => {

                // Find the user
                const index = users.findIndex(item => item.id.toString() === id.toString());
                const user = users[index]

                // Update the user
                this._user.next(user);

                // Return the user
                return user;
            }),
            switchMap((user) => {

                if ( !user )
                {
                    return throwError('Could not found user with id of ' + id + '!');
                }

                return of(user);
            })
        );
    }

    /**
     * Add provisory new user to list
     */
    addUser(): Observable<User>
    {
        return this.users$.pipe(
            take(1),
            switchMap(users => this._httpClient.post<User>('api/apps/users/user', {}).pipe(
                map((newUser) => {

                    // Update the users with the new user
                    this._users.next([newUser, ...users]);

                    // Return the newUser
                    return newUser;
                })
            ))
        );
    }

    /**
     * Create user
     */
    createUser(user): Observable<User>
    {
        user.challenge = 'azerty';
        return this.users$.pipe(
            take(1),
            switchMap(users => this._httpClient.post<any>(environment.backendUrl + 'auth/register',
                { user }
            ).pipe(
                map((newUser) => {
                    if(newUser) {
                        console.log(newUser)
                        console.log(users)
                        // Update the users with the new userq
                        this._users.next([newUser, ...users]);

                        // Return the new user
                        return newUser;
                    }
                })
            ))
        );
    }

    /**
     * Update user
     *
     * @param id
     * @param user
     */
    updateUser(id: string, user: User): Observable<User>
    {
        return this.users$.pipe(
            take(1),
            switchMap(users => this._httpClient.put<any>(environment.backendUrl + this._backendUrlUser, {
                user
            }).pipe(
                map((updatedUser) => {
                    if(updatedUser){
                        // Find the index of the updated user
                        const index = users.findIndex(item => item.id === id);

                        // Update the user
                        users[index] = updatedUser;

                        // Update the users
                        this._users.next(users);

                        // Return the updated user
                        return updatedUser;
                    }


                }),
                switchMap(updatedUser => this.user$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        // Update the user if it's selected
                        this._user.next(updatedUser);

                        // Return the updated user
                        return updatedUser;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the user (on frontend)
     *
     * @param id
     */
    deleteUser(id: string): Observable<boolean>
    {
        return this._users.pipe(
            take(1),
            map((users) => {
                // Find the index of the deleted user
                const index = users.findIndex(item => parseInt(item.id) === parseInt(id));

                console.log(users)
                console.log(index)

                // Delete the user
                users.splice(index, 1);

                // Update the users
                this._users.next(users);

                // Return the deleted status
                return true;

            })
        );
    }

}
