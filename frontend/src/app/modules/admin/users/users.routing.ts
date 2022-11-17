import { Route } from '@angular/router';
import { CanDeactivateUsersDetails } from 'app/modules/admin/users/users.guards';
import { UserEditResolver, UsersResolver } from 'app/modules/admin/users/users.resolvers';
import { UsersComponent } from 'app/modules/admin/users/users.component';
import { UsersListComponent } from 'app/modules/admin/users/list/users-list.component';
import { UsersEditComponent } from 'app/modules/admin/users/edit/users-edit.component';
import { UsersAddComponent } from "./add/users-add.component";


export const usersRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'list'
    },
    {
        path     : 'list',
        component: UsersComponent,
        resolve  : {
        },
        children : [
            {
                path     : '',
                component: UsersListComponent,
                resolve  : {
                    users         : UsersResolver,
                },
                children : [
                    {
                        path     : 'add',
                        component: UsersAddComponent,
                    },
                    {
                        path         : ':id',
                        component    : UsersEditComponent,
                        resolve      : {
                            user          : UserEditResolver,
                        },
                        canDeactivate: [CanDeactivateUsersDetails]
                    }
                ]
            }
        ]
    }
];
