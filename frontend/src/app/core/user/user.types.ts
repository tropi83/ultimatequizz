export interface User
{
    id: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    userRole: string;
    creationDate: string;
    historyQuizz: [];
    description?: string;
}
