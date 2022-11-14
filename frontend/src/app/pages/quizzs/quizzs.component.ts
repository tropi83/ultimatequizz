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
    gameMode: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _userService: UserService,
        private _formBuilder: FormBuilder,
        private _quizzService: QuizzService,
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

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });


        // Get the themes
        this._themeService.themes$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((themes: Theme[]) => {
                this.themes = themes;

                console.log(themes)
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
     * Get all quizz realised
     */
    getAll(){
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

    /**
     * Get all quizz by creation date most old
     */
    getOldest(){
        this.selectedQuizzMode = "oldest";

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

    /**
     * Get all quizz realised
     */
    getAllRealised(){

        this.selectedQuizzMode = "realised";

        this._quizzService.getAllRealised()
            .subscribe(
                () => {
                    this._changeDetectorRef.markForCheck();
                }
            );

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Get all quizz order by like DESC
     */
    getAllByLikeDesc(){

        this.selectedQuizzMode = "bestLike";

        this._quizzService.getAllByLike()
            .subscribe(
                () => {
                    this._changeDetectorRef.markForCheck();
                }
            );

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }


    /**
     * Like quizz
     */
    like(quizz){

        this._quizzService.likeQuizz(quizz)
            .subscribe(
                () => {
                    quizz.like = true;
                },
                (error) => {
                    quizz.like = false;
                },()=>{

                    // Mark for check
                    this._changeDetectorRef.markForCheck();

                }
            );
    }

    /**
     * Unlike quizz
     */
    unlike(quizz){
        this._quizzService.unlikeQuizz(quizz)
            .subscribe(
                () => {
                    quizz.like = false;
                },
                (error) => {
                    quizz.like = true;
                },()=>{

                    // Mark for check
                    this._changeDetectorRef.markForCheck();

                }
            );
    }

    /**
     * Realised quizz
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
     * UnRealised quizz
     */
    unrealisedQuizz(quizz){
        this._quizzService.unrealisedQuizz(quizz)
            .subscribe(
                () => {
                    quizz.realise = false;
                },
                (error) => {
                    quizz.realise = true;
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
     * Close Quizz and return to lists
     *
     * @param eventData
     */
    onBackFromQuizzGame(eventData: boolean) {
        this.gameMode = eventData;
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
