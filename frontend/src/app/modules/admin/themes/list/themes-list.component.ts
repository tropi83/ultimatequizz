import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Theme } from 'app/core/theme/theme.types';
import { ThemeService } from 'app/core/theme/theme.service';
import { FuseAlertService } from "../../../../../@fuse/components/alert";
import { Router } from "@angular/router";
import { FlashService } from "../../../flash/flash.service";
import { Pagination } from "../../../../core/pagination/pagination-types";

@Component({
    selector       : 'themes-list',
    templateUrl    : './themes-list.component.html',
    styles         : [
        /* language=SCSS */
        `
            .theme-grid {
                grid-template-columns: 64px auto 40px;

                @screen sm {
                    grid-template-columns: 92px auto 48px;
                }

                @screen md {
                    grid-template-columns: 72px auto 64px;
                }

                @screen lg {
                    grid-template-columns: 92px auto 132px;
                }
            }
        `
    ],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations
})
export class ThemesListComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    themes$: Observable<Theme[]>;
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: Pagination;
    searchInputControl: FormControl = new FormControl();
    selectedTheme: Theme | null = null;
    selectedThemeForm: FormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _fuseAlertService: FuseAlertService,
        private _formBuilder: FormBuilder,
        private _themeService: ThemeService,
        private _flashService: FlashService,
        private _router: Router
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
        // Create the selected theme form
        this.selectedThemeForm = this._formBuilder.group({
            id               : [''],
            name             : ['', [Validators.required]],
        });


        // Get the themes
        this.themes$ = this._themeService.themes$;

        // Get the pagination
        this._themeService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: Pagination) => {

                // Update the pagination
                this.pagination = pagination;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap((query) => {
                    this.closeDetails();
                    this.isLoading = true;

                    let pageIndex = 0;
                    let pageSize = 10;
                    let sortActive = 'id';
                    let sortDirection: 'asc' | 'desc' | '' = 'desc';

                    if(this._paginator !== undefined){
                        pageIndex = this._paginator.pageIndex;
                        pageSize = this._paginator.pageSize;
                    }
                    if(this._sort !== undefined){
                        sortActive = this._sort.active;
                        sortDirection = this._sort.direction;
                    }
                    return this._themeService.getFilteredThemes(pageIndex, pageSize, sortActive, sortDirection, query);
                }),
                map(() => {
                    this.isLoading = false;
                })
            )
            .subscribe();
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
        if ( this._sort && this._paginator )
        {
            // Set the initial sort
            this._sort.sort({
                id          : 'name',
                start       : 'asc',
                disableClear: true
            });

            // Change language
            this._paginator._intl.itemsPerPageLabel = 'Thèmes par page:';
            this._paginator._intl.nextPageLabel = 'Page suivante';
            this._paginator._intl.previousPageLabel = 'Page précédente';
            this._paginator._intl.firstPageLabel = 'Première page';
            this._paginator._intl.lastPageLabel = 'Dernière page';
            this._paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
                if (length === 0 || pageSize === 0) {
                    return `0 à ${length }`;
                }
                length = Math.max(length, 0);
                const startIndex = page * pageSize;
                // If the start index exceeds the list length, do not try and fix the end index to the end.
                const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
                return `${startIndex + 1} - ${endIndex} sur ${length}`;
            };

            // Mark for check
            this._changeDetectorRef.markForCheck();

            // If the user changes the sort order...
            this._sort.sortChange
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(() => {

                    // Reset back to the first page
                    this._paginator.pageIndex = 0;

                    // Close the edit
                    this.closeDetails();
                });

            // Get themes if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._themeService.getFilteredThemes(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction, this.searchInputControl.value);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
        }
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
     * Toggle theme edit
     *
     * @param themeId
     */
    toggleDetails(themeId: string): void
    {
        // If the theme is already selected...
        if ( this.selectedTheme && this.selectedTheme.id === themeId )
        {
            // Close the edit
            this.closeDetails();
            return;
        }

        // Get the theme by id
        this._themeService.getThemeById(themeId)
            .subscribe((theme) => {

                // Set the selected theme
                this.selectedTheme = theme;

                // Fill the form
                this.selectedThemeForm.patchValue(theme);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * Close the edit
     */
    closeDetails(): void
    {
        this.selectedTheme = null;
    }


    /**
     * Create theme
     */
    createTheme(): void
    {
        // Create the theme
        this._themeService.createTheme().subscribe(
            (newTheme) => {

                // Go to new theme
                this.selectedTheme = newTheme;

                // Fill the form
                this.selectedThemeForm.patchValue(newTheme);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }, err => {
                    this._flashService.error('ERROR ' + err.status + ' : '+ err.message);
                    this.showFlashMessage('error');
                },
            () => {
                this._flashService.success("Thème crée avec succès");
                this.showFlashMessage('success');
            }
        );
    }

    /**
     * Update the selected theme using the form data
     */
    updateSelectedTheme(): void
    {
        // Get the theme object
        let theme = this.selectedThemeForm.getRawValue();

        // Update the theme on the server
        this._themeService.updateTheme(theme.id, theme).subscribe(
             (responseTheme) => {

                    this.selectedTheme = responseTheme;
                    this._flashService.success("Thème éditée avec succès");
                    this.showFlashMessage('success');
                 },
            err => {
                this._flashService.error('ERROR ' + err.status + ' : '+ err.message);
                    this.showFlashMessage('error');
                },
                 ()=>{
                }
            );
    }


    /**
     * Delete the selected theme using the form data
     */
    deleteSelectedTheme(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Suppression thème: "' + this.selectedTheme.name + '"',
            message: 'Etes-vous sûr de vouloir supprimer ce thème ?',
            actions: {
                confirm: {
                    label: 'Supprimer'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if ( result === 'confirmed' )
            {
                // Get the theme object
                const theme = this.selectedThemeForm.getRawValue();

                // Delete the theme on the server
                this._themeService.deleteTheme(theme.id).subscribe(
                    () => {
                            this._flashService.success("Supprimé avec succès");
                            this.closeDetails();
                        },
                        err => {
                            this._flashService.error('ERROR ' + err.status + ' : '+ err.message);
                            this.showFlashMessage('error');
                            this.closeDetails();
                        },
                       () => {
                            this.closeDetails();
                    }
                );
            }
        });
    }

    /**
     * Show flash message
     */
    showFlashMessage(type: 'success' | 'error'): void
    {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {

            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 5000);
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


    /**
     * Dismiss the alert via the service
     *
     * @param name
     */
    dismissAlert(name: string): void
    {
        this._fuseAlertService.dismiss(name);
    }

    /**
     * Show the alert via the service
     *
     * @param name
     */
    showAlert(name: string): void
    {
        this._fuseAlertService.show(name);
    }

}
