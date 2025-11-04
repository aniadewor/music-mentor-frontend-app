import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { QuizServiceService } from '../service/quiz-service.service';
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
  quizTitle: string = '';
  quizDescription: string = '';
  quizScore: number = 0;

  questionIdList: number[] = [];
  studentAnswerList: string[] = [];

  scoreSum: number = 0;
  showResult: boolean = false;

  currentQuestionIndex = 0;
  selectedOption: string | null = null;

  constructor(
    private quizService: QuizServiceService,
    private userService: UserServiceService,
    private userStateService: UserStateService,
    private route: ActivatedRoute,
    private answerService: AnswerServiceService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 
    this.quizService.getQuizById(id).subscribe(quizData => {
      this.questionList = quizData.questionList;
      this.quizTitle = quizData.title;
      this.quizDescription = quizData.description;
      this.quizScore = quizData.score;
    });
  }

  next(): void {
    // 1) zapisz wybór dla bieżącego pytania
    if (this.selectedOption != null) {
      this.studentAnswerList[this.currentQuestionIndex] = this.selectedOption;
    }

    // 2) jeśli to ostatnie pytanie -> zapisz odpowiedzi i pokaż wynik
    const isLast = this.currentQuestionIndex >= this.questionList.length - 1;
    if (isLast) {
      this.saveQuizAnswer();
      return; 
    }

    // 3) w przeciwnym razie przejdź do kolejnego pytania
    this.currentQuestionIndex++;
    this.selectedOption = null;
    return; 
  }

  clearSelection(): void {
    this.selectedOption = null;
  }

  getQuizById(quizId: number): void {
   
  }

  saveQuizAnswer(): void {
    // pobierz identyfikatory
    const quizIdStr = this.route.snapshot.paramMap.get('id'); 
    const currentUser = this.userStateService.getCurrentUser();

    // guardy bezpieczeństwa
    if (!quizIdStr || !currentUser) { return; }

    this.userService.getUserByEmail(currentUser.email).subscribe(userData => {
      const userId = userData.id;

      // lista ID pytań
      this.questionIdList = this.questionList
        .map(q => q.id)
        .filter((id): id is number => id !== undefined && id !== null);

      // zapisz odpowiedzi użytkownika
      this.answerService
        .saveQuizAnswer(quizIdStr, userId, this.questionIdList, this.studentAnswerList)
        .subscribe(() => {
          // po zapisie od razu sprawdź wynik
          this.answerService
            .checkQuizCorrectAnswer(quizIdStr, userId)
            .subscribe(scoreSumData => {
              this.scoreSum = scoreSumData.scoreSum ?? 0;
              this.showResult = true; // pokaż ekran wyniku
            });
        });
    });
  }

  restart(): void {
    this.currentQuestionIndex = 0;
    this.selectedOption = null;
    this.studentAnswerList = [];
    this.scoreSum = 0;
    this.showResult = false;
  }
}
