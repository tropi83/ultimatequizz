import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { QuizzComponent } from 'app/modules/quizz/quizz.component';
import { SettingsModule } from "../../layout/common/settings/settings.module";
import { FuseFullscreenModule } from "../../../@fuse/components/fullscreen";
import { quizzRoutes } from 'app/pages/quizzs/quizzs.routing';
import { UserModule } from "../../layout/common/user/user.module";
import { FuseAlertModule } from "../../../@fuse/components/alert";
import { FuseConfirmationModule } from "../../../@fuse/services/confirmation";
import {ProgressBarModule} from "../progress-bar/progress-bar.module";

@NgModule({
    declarations: [
        QuizzComponent
    ],
    exports: [
        QuizzComponent
    ],
    imports: [
        RouterModule.forChild(quizzRoutes),
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatTooltipModule,
        FuseCardModule,
        SharedModule,
        SettingsModule,
        FuseFullscreenModule,
        UserModule,
        FuseAlertModule,
        FuseConfirmationModule,
        ProgressBarModule
    ]
})
export class QuizzModule
{
}
