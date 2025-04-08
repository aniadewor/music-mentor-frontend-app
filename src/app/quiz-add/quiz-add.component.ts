import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz-add',
  templateUrl: './quiz-add.component.html',
  styleUrls: ['./quiz-add.component.css']
})
export class QuizAddComponent {
  quizTitle: string = '';
  quizDescription: string = '';
  questions: { text: string; options: string[]; correctAnswer: number }[] = [];
  quizSaved: boolean = false;
  showValidationMessage: boolean = false;

  addQuestion() {
    this.questions.push({ text: '', options: ['', '', '', ''], correctAnswer: 0 });
  }

  saveQuiz() {
    if (!this.quizTitle.trim() || !this.quizDescription.trim()) {
      this.showValidationMessage = true;
      return;
    }

    this.showValidationMessage = false;
    this.quizSaved = true;

    const quizData = {
      title: this.quizTitle,
      description: this.quizDescription,
      questions: this.questions
    };

    console.log('Quiz zapisany:', quizData);
    alert('Quiz zapisany!');
  }
}
