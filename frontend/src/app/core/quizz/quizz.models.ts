import { Comment } from "../comment/comment.types";
import { Question } from "../question/question.types";
import {Theme} from "../theme/theme.types";

// -----------------------------------------------------------------------------------------------------
// @ Quizz
// -----------------------------------------------------------------------------------------------------
export class Quizz
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
    nbRealise: number;
    questions: Question[];

    /**
     * Constructor
     */
    constructor(
        id,
        name,
        description,
        theme,
        creationDate,
        comments,
        like,
        likeId,
        realise,
        realiseId,
        nbRealise,
        questions: Question[]
    )
    {
        this.id = id || null;
        this.name = name || null;
        this.description = description || null;
        this.theme = theme || null;
        this.creationDate = creationDate || null;
        this.comments = comments || null;
        this.like  = like || null;
        this.likeId = likeId || null;
        this.like = like || null;
        this.realise = realise || null;
        this.realiseId = realiseId || null;
        this.nbRealise = nbRealise || null;
        this.questions = questions || null;
    }
}
