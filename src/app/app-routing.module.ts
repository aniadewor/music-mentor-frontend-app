import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuizViewComponent } from './quiz-view/quiz-view.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'quiz', component: QuizViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
