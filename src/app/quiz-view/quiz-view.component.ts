import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Role } from '../models/role.enum';
import { UserStateService } from '../service/user-state-service.service';
import { UserServiceService } from '../service/user-service.service';



@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.css']
})
export class QuizViewComponent implements OnInit {
  user: User | null = null;
  Role = Role;

  constructor(private userStateService: UserStateService, private userService: UserServiceService){}

  //TODO: get real user role
  ngOnInit() {
     this.user=this.userStateService.getCurrentUser()
     console.log(this.user)
     console.log(this.user?.email)
     const email = this.user?.email;
     if (email){
      this.userService.getUserByEmail(email).subscribe(userDate =>{
        console.log(userDate);
        this.user = userDate;
        userDate.role = Role.TEACHER;
         })
     }
  }
}
