import { User } from "../user/user.types";

export interface Comment
{
    id: string;
    text: string;
    creationDate: string;
    user: User;
}

