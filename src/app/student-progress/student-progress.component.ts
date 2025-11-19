import { Component } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { UserStateService } from '../service/user-state-service.service';
import { QuizServiceService } from '../service/quiz-service.service';
import { Role } from '../models/role.enum';
import { User } from '../models/user.model';

@Component({
  selector: 'app-student-progress',
  templateUrl: './student-progress.component.html',
  styleUrls: ['./student-progress.component.css'] // <— tu zmiana
})
export class StudentProgressComponent {
  scoreList: any[] = [];
  studentId: string = '';
  className: string = '';
  studentScoreList: any[] = [];
  user: User = new User();
  Role = Role;

  constructor(
    private userStateService: UserStateService,
    private userService: UserServiceService,
    private quizService: QuizServiceService
  ) {}

  ngOnInit(): void {
    const currentUser = this.userStateService.getCurrentUser();
    if (currentUser && currentUser.email) {
      const email = currentUser.email;
      this.userService.getUserByEmail(email).subscribe(userDate => {
        this.studentId = userDate.id;
        this.user = userDate;

        this.quizService.getUserQuizDate(this.studentId).subscribe(userQuizList => {
          this.scoreList = userQuizList;
        });
      });
    }
  }

  getTeacherQuizDate() {
    this.quizService.getTeacherQuizDate(this.className).subscribe(studentQuizList => {
      this.studentScoreList = studentQuizList;
    });
  }
}
