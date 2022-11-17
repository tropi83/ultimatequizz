import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'themes',
    templateUrl    : './themes.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemesComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
