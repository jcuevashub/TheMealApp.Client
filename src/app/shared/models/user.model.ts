import { AuthModel } from './auth.model';


export class UserModel extends AuthModel {
  id!: string;
  password!: string;
  email!: string;
  firstname!: string;
  lastname!: string;
  fullname!: string;


  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.id = user.id;
    this.firstname = user.fullname;
    this.lastname = user.fullname;
    this.password = user.password || '';
    this.email = user.email || '';
  }
}
