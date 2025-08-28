import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Role } from '../models/role.enum';
import { QuizServiceService } from '../service/quiz-service.service';
import { UserServiceService } from '../service/user-service.service';
import { UserStateService } from '../service/user-state-service.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: User = new User();
  profile: User = new User();
  Role = Role;
  constructor(private quizService: QuizServiceService, private userStateService: UserStateService,private userService: UserServiceService,) {}

ngOnInit():void{
const currentUser = this.userStateService.getCurrentUser();

if(currentUser && currentUser.email){
  const email = currentUser.email;
   this.userService.getUserByEmail(email).subscribe(userDate => {
        console.log(userDate);
        this.user = userDate;
         this.profile = {
    id: this.user.id,
    email: this.user.email,
    password: '',
    name: this.user.name,
    lastName: this.user.lastName,
    role: this.user.role,
    schoolName: this.user.schoolName,
    className: this.user.className
   }
  }
)}
}
};

