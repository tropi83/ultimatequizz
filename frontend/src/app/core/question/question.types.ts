import { Quizz } from "../quizz/quizz.types";
import { Answer } from "../answer/answer.types";

export interface Question {
    id: string;
    label: string;
    quizz: Quizz;
    answers: Answer[];
    position:number;
}

