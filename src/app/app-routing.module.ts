import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuizViewComponent } from './quiz-view/quiz-view.component';
import { QuizAddComponent } from './quiz-add/quiz-add.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizSolveComponent } from './quiz-solve/quiz-solve.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'quiz', component: QuizViewComponent},
  { path: 'quizAdd', component: QuizAddComponent},
  { path: 'quiz-list', component: QuizListComponent },
  { path: 'quiz-solve/:id', component: QuizSolveComponent },
   { path: 'settings', component: SettingsComponent },
   {path: 'profil', component: ProfilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
