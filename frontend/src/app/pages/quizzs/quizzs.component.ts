import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { UserService } from "../../core/user/user.service";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";
import { User } from "../../core/user/user.model";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { QuizzService } from "../../core/quizz/quizz.service";
import { Quizz } from "../../core/quizz/quizz.models";
import { FuseAlertType } from "../../../@fuse/components/alert";
import { FuseConfirmationService } from "../../../@fuse/services/confirmation";
import { MatSelectChange } from "@angular/material/select";
import { Theme } from "../../core/theme/theme.types";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { ThemeService } from "../../core/theme/theme.service";
import { Router } from "@angular/router";
import { HistoryService } from "../../core/history/history.service";

@Component({
    selector       : 'quizzs',
    templateUrl    : './quizzs.component.html',
    styleUrls    : ['./quizzs.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizzsComponent
{

    @ViewChild('commentNgForm') commentNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    showAlert: boolean = false;
    alertComment: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    showAlertComment: boolean = false;

    filters: {
        themeSlug$: BehaviorSubject<string>;
        query$: BehaviorSubject<string>;
        hideCompleted$: BehaviorSubject<boolean>;
    } = {
        themeSlug$ : new BehaviorSubject('all'),
        query$        : new BehaviorSubject(''),
        hideCompleted$: new BehaviorSubject(false)
    };

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    commentForm: FormGroup;

    themes: Theme[];
    user: User;
    quizzs: Quizz[];

    selectedQuizz: Quizz;
    selectedQuizzMode: string = "all";

    /* todo remove */
    gameMode: boolean = true;
    gameIsStarted: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _userService: UserService,
        private _formBuilder: FormBuilder,
        private _quizzService: QuizzService,
        private _historyService: HistoryService,
        private _themeService: ThemeService,
        private _fuseConfirmationService: FuseConfirmationService
    )
    {
        // Subscribe to user changes
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to quizzs changes
        this._quizzService.quizzs$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((quizzs: Quizz[]) => {
                this.quizzs = quizzs;

                /* todo remove */
                this.selectedQuizz = quizzs[0];

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });


        // Get the themes
        this._themeService.themes$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((themes: Theme[]) => {
                this.themes = themes;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the comment form
        this.commentForm = this._formBuilder.group({
            text  : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(139)]]
            }
        );

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Switch quizz
     */
    switchSelectedQuizz(quizz){
        this.selectedQuizz = quizz;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }


    /**
     * Get all quiz by date asc (default)
     */
    getAll(){

        if(this.gameIsStarted){
            // Open the confirmation dialog
            const confirmation = this._fuseConfirmationService.open({
                title       : 'Quizz en cours !',
                message     : 'Attention ! Vous êtes en train de réaliser un quizz. Votre partie ne sera pas sauvegardée',
                dismissible : true,
                icon        : {
                    show : true,
                    name : 'heroicons_outline:exclamation',
                    color: 'warn'
                },
                actions     : {
                    confirm: {
                        show : true,
                        label: 'Quitter',
                        color: 'primary'
                    },
                    cancel : {
                        show : true,
                        label: 'Revenir',
                    }
                }
            });

            // Subscribe to the confirmation dialog closed action
            confirmation.afterClosed().subscribe(async (result) => {

                // If the confirm button pressed... redirect to sign-in page
                if ( result === 'confirmed' )
                {
                    this.gameMode = false;
                    this.gameIsStarted = false;
                    this.selectedQuizzMode = "all";
                    this._quizzService.getAll()
                        .subscribe(
                            (quizzs) => {
                                this.quizzs = quizzs;
                                this._changeDetectorRef.markForCheck();
                            }
                        );

                    // Mark for check
                    this._changeDetectorRef.markForCheck();

                }
                // If the confirm button pressed... redirect to sign-up page
                else if ( result === 'cancelled' )
                {
                    return;
                }
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();

        } else {
            this.gameMode = false;
            this.gameIsStarted = false;
            this.selectedQuizzMode = "all";
            this._quizzService.getAll()
                .subscribe(
                    (quizzs) => {
                        this.quizzs = quizzs;
                        this._changeDetectorRef.markForCheck();
                    }
                );

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }

    }

    /**
     * Get all quizz by creation date most old
     */
    getOldest(){

        if(this.gameIsStarted){
            // Open the confirmation dialog
            const confirmation = this._fuseConfirmationService.open({
                title       : 'Quizz en cours !',
                message     : 'Attention ! Vous êtes en train de réaliser un quizz. Votre partie ne sera pas sauvegardée',
                dismissible : true,
                icon        : {
                    show : true,
                    name : 'heroicons_outline:exclamation',
                    color: 'warn'
                },
                actions     : {
                    confirm: {
                        show : true,
                        label: 'Quitter',
                        color: 'primary'
                    },
                    cancel : {
                        show : true,
                        label: 'Revenir',
                    }
                }
            });

            // Subscribe to the confirmation dialog closed action
            confirmation.afterClosed().subscribe(async (result) => {

                // If the confirm button pressed... redirect to sign-in page
                if ( result === 'confirmed' )
                {
                    this.gameMode = false;
                    this.gameIsStarted = false;
                    this.selectedQuizzMode = "oldest";

                    this._quizzService.getAll('asc')
                        .subscribe(
                            (quizzs) => {
                                this.quizzs = quizzs;
                                this._changeDetectorRef.markForCheck();
                            }
                        );

                    // Mark for check
                    this._changeDetectorRef.markForCheck();

                }
                // If the confirm button pressed... redirect to sign-up page
                else if ( result === 'cancelled' )
                {
                   return;
                }
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();

        } else {
            this.gameMode = false;
            this.gameIsStarted = false;
            this.selectedQuizzMode = "oldest";

            this._quizzService.getAll('asc')
                .subscribe(
                    (quizzs) => {
                        this.quizzs = quizzs;
                        this._changeDetectorRef.markForCheck();
                    }
                );

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }

    }

    /**
     * Get all quizz realised/history
     */
    getAllRealised(){

        if(this.gameIsStarted){
            // Open the confirmation dialog
            const confirmation = this._fuseConfirmationService.open({
                title       : 'Quizz en cours !',
                message     : 'Attention ! Vous êtes en train de réaliser un quizz. Votre partie ne sera pas sauvegardée',
                dismissible : true,
                icon        : {
                    show : true,
                    name : 'heroicons_outline:exclamation',
                    color: 'warn'
                },
                actions     : {
                    confirm: {
                        show : true,
                        label: 'Quitter',
                        color: 'primary'
                    },
                    cancel : {
                        show : true,
                        label: 'Revenir',
                    }
                }
            });

            // Subscribe to the confirmation dialog closed action
            confirmation.afterClosed().subscribe(async (result) => {

                // If the confirm button pressed... redirect to sign-in page
                if ( result === 'confirmed' )
                {
                    this.gameMode = false;
                    this.gameIsStarted = false;
                    this.selectedQuizzMode = "realised";

                    this._quizzService.getAllRealised(this.user.id)
                        .subscribe(
                            () => {
                                this._changeDetectorRef.markForCheck();
                            }
                        );

                    // Mark for check
                    this._changeDetectorRef.markForCheck();

                }
                // If the confirm button pressed... redirect to sign-up page
                else if ( result === 'cancelled' )
                {
                    return;
                }
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();

        } else {
            this.gameMode = false;
            this.gameIsStarted = false;
            this.selectedQuizzMode = "realised";

            this._quizzService.getAllRealised(this.user.id)
                .subscribe(
                    () => {
                        this._changeDetectorRef.markForCheck();
                    }
                );

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }

    }

    /**
     * Realised/history quizz
     */
    realisedQuizz(quizz){

        this._quizzService.realisedQuizz(quizz)
            .subscribe(
                () => {
                    quizz.realise = true;
                },
                (error) => {
                    quizz.realise = false;
                },()=>{

                    // Mark for check
                    this._changeDetectorRef.markForCheck();

                }
            );
    }

    /**
     * Create comment
     */
    createComment(): void
    {

        if (!this.user) {

            // Open the confirmation dialog
            const confirmation = this._fuseConfirmationService.open({
                title       : 'Veuillez vous connecter !',
                message     : 'Vous devez être connecté pour ajouter un commentaire. Créer votre compte ou connectez vous.',
                dismissible : true,
                icon        : {
                    show : true,
                    name : 'heroicons_outline:exclamation',
                    color: 'warn'
                },
                actions     : {
                    confirm: {
                        show : true,
                        label: 'Se connecter',
                        color: 'primary'
                    },
                    cancel : {
                        show : true,
                        label: 'S\'inscrire',
                    }
                }
            });

            // Subscribe to the confirmation dialog closed action
            confirmation.afterClosed().subscribe(async (result) => {

                // If the confirm button pressed... redirect to sign-in page
                if ( result === 'confirmed' )
                {
                    await this._router.navigate(['sign-in']);
                }
                // If the confirm button pressed... redirect to sign-up page
                else if ( result === 'cancelled' )
                {
                    await this._router.navigate(['sign-up']);
                }
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();

        } else {

            // Return if the comment form is invalid
            if ( this.commentForm.invalid )
            {
                return;
            }

            // Disable the comment form
            this.commentForm.disable();

            // Hide the comment alert
            this.showAlertComment = false;

            // Add Comment
            this._quizzService.createComment(this.commentForm.controls['text'].value, this.selectedQuizz.id)
                .subscribe(
                    () => {
                        this.alertComment = {
                            type   : 'success',
                            message: 'Commentaire crée avec succès.',
                        };

                        this.commentForm.reset();
                    },
                    (error) => {

                        let errorMessage = error.error || error.errors.toString() || error.statusText || 'Une erreur est survenue. Veuillez re-essayer plus tard.';
                        this.alertComment = {
                            type   : 'error',
                            message: errorMessage
                        };

                    },
                    () => {
                        // Re-enable the comment form
                        this.commentForm.enable();

                        // Show the comment alert
                        this.showAlertComment = true;

                        // Mark for check
                        this._changeDetectorRef.markForCheck();
                    }

                );
        }


    }

    /**
     * Change screen to game quizz
     *
     * @param quizz
     */
    playQuizzGame(quizz: Quizz){
        this.gameMode = true;
        this.selectedQuizz = quizz;
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Close Quiz game and return to quiz lists (communicate with child component "QuizzComponent")
     *
     * @param eventData
     */
    onBackFromQuizzGame(eventData: boolean) {
        this.gameMode = eventData;
    }

    /**
     * Check if quizz is started in child component (communicate with child component "QuizzComponent")
     *
     * @param eventData
     */
    onQuizStartedStateChange(eventData: boolean) {
        this.gameIsStarted = eventData;
    }

    /**
     * Show/hide completed courses
     *
     * @param change
     */
    toggleCompleted(change: MatSlideToggleChange): void
    {
        this.filters.hideCompleted$.next(change.checked);
    }


    /**
     * Filter by theme
     *
     * @param change
     */
    filterByTheme(change: MatSelectChange): void
    {
        this.filters.themeSlug$.next(change.value);
    }

    /**
     * Filter by search query
     *
     * @param query
     */
    filterByQuery(query: string): void
    {
        this.filters.query$.next(query);
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
