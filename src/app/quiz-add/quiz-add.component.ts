import { Component } from '@angular/core';
import { Question } from '../models/Question.model';
import { Quiz } from '../models/quiz.model';
import { QuizServiceService } from '../service/quiz-service.service';
import { Router } from 'express';

@Component({
  selector: 'app-quiz-add',
  templateUrl: './quiz-add.component.html',
  styleUrls: ['./quiz-add.component.css']
})
export class QuizAddComponent {
  question:Question={};
  quiz:Quiz={};
  questions:Question[]=[];

  showValidationMessage=false;
  quizSaved=false;

constructor(private quizService: QuizServiceService, private router:Router){

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
    this.quizService.addQuiz(this.quiz).subscribe(response => {
      console.log('Add Quiz',response)
    })
    if (!this.quiz.title || !this.quiz.description) {
      this.showValidationMessage = true;
      return;
    }

    this.showValidationMessage = false;
    this.quizSaved = true;

    const quizData = {
      title: this.quiz.title,
      description: this.quiz.description
    };


    console.log('Quiz zapisany:', quizData);
    alert('Quiz zapisany!');
  }

}
