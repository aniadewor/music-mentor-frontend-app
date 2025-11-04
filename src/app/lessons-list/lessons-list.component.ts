import { Component } from '@angular/core';
import { UserStateService } from '../service/user-state-service.service';
import { UserServiceService } from '../service/user-service.service';
import { LessonsServiceService } from '../service/lessons-service.service';
import { Lesson } from '../models/lesson.model';
import { Role } from '../models/role.enum';

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrl: './lessons-list.component.css'
})
export class LessonsListComponent {
  filter: string = '';
  lessonsList: Lesson[] = [];
  role!: Role;


  constructor(private userStateService: UserStateService, private userService: UserServiceService, private lessonsService: LessonsServiceService) { }

  ngOnInit(): void {
    const currentUser = this.userStateService.getCurrentUser();
    if (currentUser && currentUser.email) {
      const email = currentUser.email;
      this.userService.getUserByEmail(email).subscribe(userDate => {
        this.role = userDate.role;
        if (this.role === Role.TEACHER) {
          this.filter = userDate.name + " " + userDate.lastName;
        }
        else if (this.role === Role.STUDENT) {
          this.filter = userDate.className;
        }
        this.lessonsService.getLessons(this.filter, this.role).subscribe({
          next: (lessonListDate: Lesson[]) => {
            this.lessonsList = lessonListDate;
          },
        }) 
      })
    }
  }
}
