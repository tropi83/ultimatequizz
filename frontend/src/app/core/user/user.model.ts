export class User
{
    id: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    userRole: string;
    creationDate: string;
    historyQuizz: [];

    /**
     * Constructor
     */
    constructor(id, username, email, firstname, lastname, userRole, creationDate, historyQuizz)
    {
        this.id = id || null;
        this.username = username || null;
        this.email = email || null;
        this.firstname = firstname || null;
        this.lastname = lastname || null;
        this.userRole = userRole || null;
        this.creationDate = creationDate || null;
        this.historyQuizz = historyQuizz || null;
    }

}
