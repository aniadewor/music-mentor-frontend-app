import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { UserStateService } from '../service/user-state-service.service';
import { User} from '../models/user.model';


interface User2 {
  id: number;
  name: string;
  lastName: string;
  className: string;
  schoolName: string;
  role: string;
 
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  users: User2[] = [];
  user: User = new User();
  selectedClasses: { [key: number]: string } = {};
  schoolName: string = '';

constructor(private userService: UserServiceService, private userStateService: UserStateService) {}

ngOnInit() {
 const currentUser = this.userStateService.getCurrentUser();

  if (currentUser && currentUser.email) {
    const email = currentUser.email; 
  this.userService.getUserByEmail(email)
      .subscribe(userDate => {
        this.user = userDate;
        this.schoolName = userDate.schoolName;  
        console.log('Przypisano user i schoolName', this.user, this.schoolName);
         this.userService.getUserBySchoolName(this.schoolName).subscribe((users: User2[]) => {
        this.users = users;
         this.users = users.filter(u => u.role === 'STUDENT');
    // Dla każdego użytkownika ustaw domyślną wartość klasy (jeśli już jest przypisana).
    users.forEach(u => this.selectedClasses[u.id] = u.className || '');
  });
      });
  }
      console.log(this.user.schoolName);
 
}

// Metoda aktualizująca klasę przypisaną do danego użytkownika.
// Wywoływana np. po zmianie wartości w polu input/select.
updateClass(userId: number) {
  // Pobierz nową wartość klasy z selectedClasses.
  const className = this.selectedClasses[userId];
  // Wywołaj metodę serwisu, która aktualizuje klasę danego użytkownika w bazie.
  this.userService.updateUserClassName(userId, className)
    .subscribe(() => {
  alert("Zapisano pomyślnie.")
    });
}
}

