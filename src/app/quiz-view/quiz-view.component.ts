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
  user: User = new User();
  Role = Role;

  constructor(private userStateService: UserStateService, private userService: UserServiceService){}

  ngOnInit() {
    const currentUser = this.userStateService.getCurrentUser();
    if (currentUser) {
      this.user = currentUser;
    }
     this.getUserDate();
  }

  private getUserDate() {
    const email = this.user?.email;
    if (email) {
      this.userService.getUserByEmail(email).subscribe(userDate => {
        console.log(userDate);
        this.user = userDate;
      });
    }
  }
}
