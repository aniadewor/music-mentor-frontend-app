import { Component } from '@angular/core';
import { UserServiceService } from '../service/user-service.service'; 
import { QuizServiceService } from '../service/quiz-service.service';

interface Question {
  text: string;
  options: string[];
}

@Component({
  selector: 'app-quiz-solve',
  templateUrl: './quiz-solve.component.html',
  styleUrls: ['./quiz-solve.component.css']
})
export class QuizSolveComponent {
  constructor(private quizService:QuizServiceService , private userServiceService:UserServiceService ){

  }
  questions: Question[] = [
    {
      text: 'Jak nazywa się odległość między dźwiękiem C a G?',
      options: ['Seksta', 'Kwinta', 'Tryton', 'Oktawa']
    },

  ];

  currentQuestionIndex = 0;
  selectedOption: string | null = null;

  next(): void {

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedOption = null;
    } else {
    //koniec quizu
    }
  }
  getQuizById(quizId:number){
    this.quizService.getQuizById(quizId).subscribe({})

  }
}
