import {Role} from './role.enum'
export class User {
  public id:number;
  public email: string;
  public password: string;
  public name: string;
  public lastName: string;
  public role: Role;
  public schoolName: string;
 constructor()
 {this.id=0,
  this.email='',
  this.password='',
  this.name= '',
  this.lastName='',
  this.role=Role.STUDENT;
  this.schoolName= ''
}
}
