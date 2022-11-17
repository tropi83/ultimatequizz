import { Route } from '@angular/router';
import { ThemesComponent } from 'app/modules/admin/themes/themes.component';
import { ThemesListComponent } from 'app/modules/admin/themes/list/themes-list.component';
import { ThemesResolver } from 'app/modules/admin/themes/themes.resolvers';

export const themesRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'list'
    },
    {
        path     : 'list',
        component: ThemesComponent,
        children : [
            {
                path     : '',
                component: ThemesListComponent,
                resolve  : {
                    themes   : ThemesResolver,
                }
            },
            {
                path     : ':themeId',
                component: ThemesListComponent,
                resolve  : {
                    themes  : ThemesResolver,
                }
            }
        ]
    }
];
