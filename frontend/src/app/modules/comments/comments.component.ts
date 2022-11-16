import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { Quizz } from "../../core/quizz/quizz.models";
import { User } from "../../core/user/user.types";

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls  : ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit{

    @Input() quizz: Quizz;
    @Input() user: User;


    constructor(
    ) { }

    ngOnInit() {
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
