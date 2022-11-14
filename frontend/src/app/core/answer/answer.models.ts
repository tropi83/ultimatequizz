import { Question } from "../question/question.types";

// -----------------------------------------------------------------------------------------------------
// @ Answer
// -----------------------------------------------------------------------------------------------------
export class Answer
{
    id: string;
    label: string;
    isCorrect: boolean;
    question: Question;

    /**
     * Constructor
     */
    constructor(id, label, isCorrect, question)
    {
        this.id = id || null;
        this.label = label || null;
        this.isCorrect = isCorrect || null;
        this.question = question || null;
    }
}
