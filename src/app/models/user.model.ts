import {Role} from './role.enum'
export class User {
  public email: string;
  public password: string;
  public name: string;
  public lastName: string;
  public role: Role;
 constructor()
 {this.email='',
  this.password='',
  this.name= '',
  this.lastName='',
  this.role= Role.STUDENT;
}
}
