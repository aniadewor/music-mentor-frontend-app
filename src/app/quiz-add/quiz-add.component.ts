import { Component, OnInit } from '@angular/core';
import { Quiz } from '../models/quiz.model';
import { QuizServiceService } from '../service/quiz-service.service';
import { Router } from '@angular/router';
import { Question } from '../models/question.model';
import { UserStateService } from '../service/user-state-service.service';
import { User } from '../models/user.model';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-quiz-add',
  templateUrl: './quiz-add.component.html',
  styleUrls: ['./quiz-add.component.css'],
})
export class QuizAddComponent implements OnInit{
  question:Question={};
  quiz:Quiz={};
  questions:Question[]=[];
  user: User = new User();

  showValidationMessage=false;
  quizSaved=false;

constructor(private quizService: QuizServiceService, private router:Router, private userStateService: UserStateService, private userService: UserServiceService){
}

ngOnInit(){
const currentUser = this.userStateService.getCurrentUser();
if (currentUser) {
  this.user = currentUser;
}
console.log(currentUser);
}

  addQuestion() {
    this.questions.push({...this.question})
    const quizData = {
      quizId: this.quiz.id,
      questionList: this.questions
    };
    this.quizService.addQuestions(quizData).subscribe(response =>{
      console.log('Add Questions',response)
    })
  }

  saveQuiz() {
    console.log(this.quiz)
    this.getUserDate();
    console.log(this.user.id);
    this.quiz.ownerId=this.user.id;
    console.log(this.quiz);
    this.quizService.addQuiz(this.quiz).subscribe(response => {
      console.log('Add Quiz',response)
    })
    if (!this.quiz.title || !this.quiz.description) {
      this.showValidationMessage = true;
      return;
    }

    this.showValidationMessage = false;
    this.quizSaved = true;
  }
  private getUserDate() {
    const email = this.user?.email;
    if (email) {
      this.userService.getUserByEmail(email).subscribe(userDate => {
        console.log(userDate);
        this.user = userDate;
        console.log(this.user);
      });
    }
  }
}
