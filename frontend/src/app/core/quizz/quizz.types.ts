import { Comment } from "../comment/comment.types";
import { Question } from "../question/question.types";
import { Theme } from "../theme/theme.types";

export interface Quizz
{
    id: string;
    name: string;
    description: string;
    theme: Theme;
    creationDate: string;
    comments: Comment[];
    like: boolean;
    likeId: string;
    realise: boolean;
    realiseId: string;
    nbQuizzPlayed?: number;
    questions: Question[];
}

