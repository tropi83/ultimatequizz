import { Quizz } from "../quizz/quizz.types";
import { Answer } from "../answer/answer.types";

// -----------------------------------------------------------------------------------------------------
// @ Question
// -----------------------------------------------------------------------------------------------------
export class Question
{
    id: string;
    label: string;
    quizz: Quizz;
    answers: Answer[];
    position:number;

    /**
     * Constructor
     */
    constructor(id, label, quizz, answers, position)
    {
        this.id = id || null;
        this.label = label || null;
        this.quizz = quizz || null;
        this.answers = answers || null;
        this.position = position || null;
    }
}
