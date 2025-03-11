import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuizViewComponent } from './quiz-view/quiz-view.component';
import { QuizAddComponent } from './quiz-add/quiz-add.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'quiz', component: QuizViewComponent},
  { path: 'quizAdd', component: QuizAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
