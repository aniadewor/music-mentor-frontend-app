import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Role } from '../models/role.enum';
import { UserStateService } from '../service/user-state-service.service';



@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.css']
})
export class QuizViewComponent implements OnInit {
  user: User = new User();
  Role = Role;

  constructor(private userStateService: UserStateService){}

  //TODO: get real user role
  ngOnInit() {
     const userEmail=this.userStateService.getCurrentUser()
     console.log(userEmail)
     this.user.role = Role.TEACHER;
  }
}
