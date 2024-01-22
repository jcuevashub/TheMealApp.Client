import { AuthModel } from "./auth.model";

export class UserRespose extends AuthModel {
    id!: string;
    firstName!: string;
    email!: string;
    lastName!: string;
    dateOfBirth!: string;
}


