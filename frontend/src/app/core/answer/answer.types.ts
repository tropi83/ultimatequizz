import { Question } from "../question/question.types";


export interface Answer
{
    id: number;
    label: string;
    isCorrect: boolean;
    question: Question;
}

