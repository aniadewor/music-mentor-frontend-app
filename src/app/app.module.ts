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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuizViewComponent,
    QuizAddComponent,
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


