import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class FlashService {

    constructor(private snackBar: MatSnackBar) {
    }

    success(message: string) {
        this.snackBar.open(message, null, {
            panelClass: ['bg-primary', 'text-accent-50'],
            duration: 3000
        });
    }

    notice(message: string) {
        this.snackBar.open(message, null, {
            panelClass: ['bg-info', 'text-accent-50', 'custom-snackbar'],
            duration: 3000
        });
    }

    warn(message: string) {
        this.snackBar.open(message, null, {
            panelClass: ['bg-warn-400', 'text-accent-50', 'custom-snackbar'],
            duration: 10000
        });
    }

    error(message: string) {
        this.snackBar.open(message, 'Fermer', {
            panelClass: ['bg-warn', 'text-accent-50', 'custom-snackbar'],

        });
    }

    showFormError() {
        this.warn('Veuillez corriger les champs marqués en rouge');
    }
}
