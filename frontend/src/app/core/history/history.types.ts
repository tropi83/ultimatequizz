import { Quizz } from "../quizz/quizz.types";
import { User } from "../user/user.types";

export interface History
{
    id: string;
    points: number;
    creationDate: string;
    quizz: Quizz;
    user: User;
    quizzId?: number;
    userId?: number;
    time?: number;
}

