import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { QuizServiceService } from '../service/quiz-service.service';
import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';
import { ActivatedRoute } from '@angular/router';
import { AnswerServiceService } from '../service/answer-service.service';
import { UserStateService } from '../service/user-state-service.service';

@Component({
  selector: 'app-quiz-solve',
  templateUrl: './quiz-solve.component.html',
  styleUrls: ['./quiz-solve.component.css']
})
export class QuizSolveComponent implements OnInit {

  questionList: Question[] = [];
  quizTitle: String = '';
  quizDescription: String = '';
  quizScore: number = 0;
  questionIdList: number[] = [];
  studentAnswerList: string[] = [];

  currentQuestionIndex = 0;
  selectedOption: string | null = null;

  constructor(private quizService: QuizServiceService, private userService: UserServiceService, private userStateService: UserStateService, private route: ActivatedRoute, private answerService: AnswerServiceService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.quizService.getQuizById(id).subscribe(quizDate => {
      this.questionList = quizDate.questionList;
      this.quizTitle = quizDate.title;
      this.quizDescription = quizDate.description;
      this.quizScore = quizDate.score;
      console.log(this.questionList);
      console.log(quizDate);
    })

  }
  next(): void {
    if (this.currentQuestionIndex < this.questionList.length - 1) {
      this.currentQuestionIndex++;
      
    } else {
      //koniec quizu
    }
    console.log("selectedOption", this.selectedOption);
    if(this.selectedOption != null){
    this.studentAnswerList.push(this.selectedOption);}
    console.log(this.studentAnswerList);
  }

  clearSelection(){
   this.selectedOption = null; 
  }

  getQuizById(quizId: number) {
  }

  saveQuizAnswer() {
    const quizId = this.route.snapshot.paramMap.get('id');
    const currentUser = this.userStateService.getCurrentUser();
    let userId = 0;
    if (currentUser) {
      this.userService.getUserByEmail(currentUser.email).subscribe(userDate => {
        userId = userDate.id
        this.questionIdList = this.questionList
          .map(q => q.id)
          .filter((id): id is number => id !== undefined && id !== null);
        if (quizId != null) {
          this.answerService.saveQuizAnswer(quizId, userId, this.questionIdList, this.studentAnswerList).subscribe(answerDate => {
            console.log(answerDate)
          })
        }
      })
    }
  }
}
