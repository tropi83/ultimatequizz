import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import {InitialDataResolver} from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/quizzs-list'
    {path: '', pathMatch : 'full', redirectTo: 'quizzs'},

    // Redirect signed in user to the '/quizz-list'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'quizzs'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            //Auth
            {path: 'sign-in', loadChildren: () => import('app/pages/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/pages/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)},

            // Errors
            {path: '404', loadChildren: () => import('app/modules/error/error-404/error-404.module').then(m => m.Error404Module)},
            {path: '500', loadChildren: () => import('app/modules/error/error-500/error-500.module').then(m => m.Error500Module)},
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/pages/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
        ]
    },

    // Landing routes
    {
        path: '',
        component  : LayoutComponent,
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        data: {
            layout: 'empty'
        },
        children   : [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
            {path: 'quizzs', loadChildren: () => import('app/pages/quizzs/quizzs.module').then(m => m.QuizzsModule)},
            {path: 'sign-out', loadChildren: () => import('app/pages/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
        ]
    },

    // Admin routes
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [

        ]
    },
    {path: '**', redirectTo: '404'}

];
