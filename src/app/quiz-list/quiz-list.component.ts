import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from '../service/quiz-service.service';
import { UserStateService } from '../service/user-state-service.service';
import { UserServiceService } from '../service/user-service.service';
import { switchMap } from 'rxjs';

interface Quiz {
  title: string;
  description: string;
  buttonLabel: string;
}

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {

  quizzes: Quiz[] = [];

 constructor(private quizService: QuizServiceService, private userStateService: UserStateService,private userService: UserServiceService,) {}

ngOnInit(): void {
  // Pobieramy aktualnie zalogowanego użytkownika z serwisu, który przechowuje info o użytkowniku.
  const currentUser = this.userStateService.getCurrentUser();

  // Jeśli użytkownik jest zalogowany i ma ustawiony e-mail
  if (currentUser && currentUser.email) {
    const email = currentUser.email; // Zapisujemy e-mail użytkownika

    // Pobieramy pełne dane użytkownika z backendu po jego adresie e-mail.
    // .pipe() pozwala nam połączyć kilka operacji asynchronicznych w jednym łańcuchu.
    this.userService.getUserByEmail(email)
      .pipe(
        // switchMap sprawia, że jak już pobierzemy użytkownika, to od razu pobieramy quizy dla tego użytkownika (po jego id).
        switchMap(user => this.quizService.getQuizzesByUserId(user.id))
      )
      .subscribe({
        // Jeśli wszystko się udało i quizy zostały pobrane:
        next: (quizzes: Quiz[]) => {
          // Pokazujemy je w konsoli (do debugowania)
          console.log('ODEBRANE QUIZY:', quizzes);
          // Przypisujemy je do zmiennej, żeby wyświetlić je na stronie.
          this.quizzes = quizzes;
        },
        // Jeśli coś pójdzie nie tak na którymś etapie pobierania danych:
        error: (err) => {
          // Pokazujemy błąd w konsoli.
          console.error('Błąd pobierania quizów:', err);
        }
      });

  } else {
    // Jeśli użytkownik nie jest zalogowany lub nie ma e-maila, dajemy ostrzeżenie w konsoli.
    console.warn('Brak zalogowanego użytkownika!');
  }
  }
}


