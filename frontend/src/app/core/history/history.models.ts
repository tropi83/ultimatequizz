import { Quizz }  from "../quizz/quizz.types";
import { User } from "../user/user.types";

// -----------------------------------------------------------------------------------------------------
// @ History
// -----------------------------------------------------------------------------------------------------
export class History
{
    id: string;
    points: number;
    creationDate: string;
    quizz: Quizz;
    user: User;
    quizzId?: number;
    userId?: number;
    time?: number;

    /**
     * Constructor
     */
    constructor(
        id,
        points,
        creationDate,
        quizz,
        user,
        time,
    )
    {
        this.id = id || null;
        this.points = points || null;
        this.creationDate = creationDate || null;
        this.quizz = quizz || null;
        this.user = user || null;
        this.time = time || null;
    }
}
