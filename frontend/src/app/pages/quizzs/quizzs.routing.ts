import { Route } from '@angular/router';
import { QuizzsComponent } from 'app/pages/quizzs/quizzs.component';
import { QuizzHistoryByUserResolver, QuizzResolver, QuizzThemesResolver } from "./quizzs.resolvers";

export const quizzRoutes: Route[] = [
    {
        path     : '',
        component: QuizzsComponent,
        resolve  : {
            quizzs: QuizzResolver,
            themes: QuizzThemesResolver,
            historyByUser: QuizzHistoryByUserResolver,
        },
    }
];
