
import { User } from "../user/user.types";

// -----------------------------------------------------------------------------------------------------
// @ Comment
// -----------------------------------------------------------------------------------------------------
export class Comment
{
    id: string;
    text: string;
    creationDate: string;
    user: User;

    /**
     * Constructor
     */
    constructor(id, text, creationDate, user)
    {
        this.id = id || null;
        this.text = text || null;
        this.creationDate = creationDate || null;
        this.user = user || null;
    }
}
