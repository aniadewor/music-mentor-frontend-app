import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { QuizViewComponent } from './quiz-view/quiz-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizAddComponent } from './quiz-add/quiz-add.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizSolveComponent } from './quiz-solve/quiz-solve.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfilComponent } from './profil/profil.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuizViewComponent,
    QuizAddComponent,
    QuizListComponent,
    QuizSolveComponent,
    SettingsComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


