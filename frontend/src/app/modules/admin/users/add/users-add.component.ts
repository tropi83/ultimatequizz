import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Subject, Subscription, takeUntil} from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UsersListComponent } from 'app/modules/admin/users/list/users-list.component';
import { FlashService } from "../../../flash/flash.service";
import { User } from "../../../../core/user/user.types";
import { UsersService } from "../users.service";

@Component({
    selector       : 'users-add',
    templateUrl    : './users-add.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersAddComponent implements OnInit, OnDestroy
{
    userForm: FormGroup;
    user: User;
    users: User[];
    emailAlreadyUsed: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _usersListComponent: UsersListComponent,
        private _usersService: UsersService,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _renderer2: Renderer2,
        private _router: Router,
        private _viewContainerRef: ViewContainerRef,
        private _flashService: FlashService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Open the drawer
        this._usersListComponent.matDrawer.open();

        // Create the user form
        this.userForm = this._formBuilder.group({
            id          : [''],
            username    : ['', [Validators.required]],
            email       : ['', [Validators.email]],
            firstname   : ['', [Validators.required]],
            lastname    : ['', [Validators.required]],
            admin       : [false],
        });

        // Get the users
        this._usersService.users$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((users: User[]) => {
                this.users = users;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._usersListComponent.matDrawer.close();
    }

    /**
     * Restore Email and Username form field
     *
     * @param $event
     */
    restoreForm($event: any): void
    {
        this.emailAlreadyUsed = false;
        this.userForm.controls['username'].setErrors(null);
        this.userForm.controls['email'].setErrors(null);
        this.userForm.controls['firstname'].setErrors(null);
        this.userForm.controls['lastname'].setErrors(null);
        this.userForm.updateValueAndValidity();
    }

    /**
     * Create the user
     */
    createUser(): void
    {
        // Get the user object
        const user = this.userForm.getRawValue();

        // Add the user to list
        this._usersService.createUser(user).subscribe(
            (user) => {
                this._flashService.success("Utilisateur crée avec succès");
                this.closeDrawer();
                this._router.navigate(['./users']);
            }, err => {
                let errorMessage = "";
                if (err && err.error && err.error.error) {
                    errorMessage = err.error.error;
                    if (errorMessage === "Email address already used.") {
                        this.userForm.controls['email'].setErrors({'incorrect': true});
                        errorMessage = 'Adresse email déja utilisée.'
                    }
                    if (errorMessage === "Username already used.") {
                        this.userForm.controls['username'].setErrors({'incorrect': true});
                        errorMessage = 'Nom d\'utilisateur déjà utilisé.'
                    }
                } else {
                    errorMessage = err.message;
                }
                this._flashService.error('ERROR ' + err.status + ' : ' + errorMessage);
            });
    }

    /**
     * Close user add | view
     */
    closeUser(): any
    {
       this.closeDrawer();

       this._router.navigate(['/admin/users/list']);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
