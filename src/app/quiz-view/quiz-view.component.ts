import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import {Role} from '../models/role.enum'
@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrl: './quiz-view.component.css'
})
export class QuizViewComponent implements OnInit{
  user: User= new User()
  ngOnInit() {
    this.user.role = Role.TEACHER
  }
}
