import { Component, OnInit } from '@angular/core';
import { Quiz } from '../models/quiz.model';
import { QuizServiceService } from '../service/quiz-service.service';
import { Router } from '@angular/router';
import { Question } from '../models/question.model';
import { UserStateService } from '../service/user-state-service.service';
import { User } from '../models/user.model';
import { UserServiceService } from '../service/user-service.service';
import { response } from 'express';

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
  quizzes: Quiz[] = [];

  showValidationMessage=false;
  quizSaved=false;

constructor(private quizService: QuizServiceService, private router:Router, private userStateService: UserStateService, private userService: UserServiceService){
}

ngOnInit(){
const currentUser = this.userStateService.getCurrentUser();
if (currentUser) {
  this.user = currentUser;
  this.user.id = currentUser.id;
}
if (currentUser?.email){
this.userService.getUserByEmail(currentUser?.email).subscribe(userDate => {
        this.user = userDate;
  })
    }
    this.quizz()
  }

  addQuestion() {

    const quizData = {
      quizId: this.quiz.id,
      questionList: this.questions
    };
    console.log(this.quiz.id)
    this.quizService.addQuestions(quizData).subscribe(response =>{
      console.log('Add Questions',response)
    })
    
    this.router.navigate(['/quiz-list']);
    
  }

  addNewQuestion(){
      this.questions.push({...this.question})
  }

  saveQuiz() {
    this.quiz.ownerId=this.user.id;
    this.quiz.schoolName = this.user.schoolName;
    this.quizService.addQuiz(this.quiz).subscribe(response => {
      console.log('Add Quiz',response)
      this.quiz = response;
      this.quiz.id = response.quizId
    })
    if (!this.quiz.title || !this.quiz.description) {
      this.showValidationMessage = true;
      return;
    }

    this.showValidationMessage = false;
    this.quizSaved = true;
  }

quizz(){
  this.quizService.getQuizzesByUserId(this.user.id).subscribe({

        next: (quizzes: Quiz[]) => {
         
          console.log(quizzes);
          this.quizzes = quizzes;
        },
    
        error: (err) => {
          console.error('Błąd pobierania quizów:', err);
        }
      });
    } 
  }


