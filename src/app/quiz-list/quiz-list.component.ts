import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from '../service/quiz-service.service';
import { UserStateService } from '../service/user-state-service.service';
import { UserServiceService } from '../service/user-service.service';
import { switchMap } from 'rxjs';
import { User } from '../models/user.model';
import { Role } from '../models/role.enum';

interface Quiz {
   id: number;   
  title: string;
  description: string;
  buttonLabel: string;
  className?: string[];
}

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  user: User = new User();
  quizzes: Quiz[] = [];
  classNumbers: string[] = ['1', '2', '3', '4', '5', '6', '7'];
  selectedQuiz: Quiz | null = null;
  assigningClasses: string[] = [];
  Role = Role;

 constructor(private quizService: QuizServiceService, private userStateService: UserStateService,private userService: UserServiceService,) {}

ngOnInit(): void {

  const currentUser = this.userStateService.getCurrentUser();

  if (currentUser && currentUser.email) {
    const email = currentUser.email; 
   this.userService.getUserByEmail(email).subscribe(userDate => {
        console.log(userDate);
        this.user = userDate;
        console.log(this.user)
        if (this.user.role==Role.TEACHER){
          this.quizService.getQuizzesByUserId(this.user.id)
      .subscribe(quizzes => {
          console.log('ODEBRANE QUIZY:', quizzes);
          this.quizzes = quizzes;
          console.log(this.quizzes)
        },
      )};
      if (this.user.role==Role.STUDENT){
        this.quizService.getQuizzesByClass(this.user.className, this.user.id).subscribe(quizzes => {
          console.log('ODEBRANE QUIZY:', quizzes);
          this.quizzes = quizzes;
          console.log(this.quizzes)
        },
   )}
      });
  } else {
    console.warn('Brak zalogowanego użytkownika!');
  }
  }
openAssignClass(quiz: Quiz) {
  this.selectedQuiz = quiz;
  this.assigningClasses = quiz.className ? [...quiz.className] : [];
}

toggleClassAssignment(classNum: string) {
  if (this.assigningClasses.includes(classNum)) {
    this.assigningClasses = this.assigningClasses.filter(c => c !== classNum);
  } else {
    this.assigningClasses.push(classNum);
  }
}

saveClassAssignment(quiz: Quiz) {
  this.quizService.updateClassName(quiz.id, this.assigningClasses).subscribe({
    next: (updatedQuiz: Quiz) => {
      // Aktualizuje przypisane klasy w quizie na froncie.
      quiz.className = updatedQuiz.className;
      // Zamyka panel przypisywania.
      this.selectedQuiz = null;
      // Czyści wybrane klasy.
      this.assigningClasses = [];
    },
    error: err => {
      alert('Błąd zapisywania klas!');
    }
  });
}

// Anuluje przypisywanie klas, zamyka panel i czyści tymczasowe dane.
cancelAssignClass() {
  this.selectedQuiz = null;
  this.assigningClasses = [];
}

}



