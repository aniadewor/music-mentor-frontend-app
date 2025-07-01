import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { Role } from '../models/role.enum';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  profile: User = {
    id: 1,
    email: 'anna.kowalska@example.com',
    password: '',
    name: 'Anna',
    lastName: 'Kowalska',
    role: Role.STUDENT,
    schoolName: 'Szkoła Podstawowa nr 1 w Zabrzu',
    className: '5'
  };
}