import { AuthModel } from './auth.model';


export class UserModel extends AuthModel {
  password!: string;
  email!: string;
  firstname!: string;
  lastname!: string;
}
