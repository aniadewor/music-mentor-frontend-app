import { Component } from '@angular/core';
import { LessonsServiceService } from '../service/lessons-service.service';
import { UserStateService } from '../service/user-state-service.service';
import { UserServiceService } from '../service/user-service.service';
import { User } from '../models/user.model';
import { Lesson } from '../models/lesson.model';
import { Role } from '../models/role.enum';
import { FileService } from '../service/file.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrl: './lesson-create.component.css'
})
export class LessonCreateComponent {
  user: User = new User();
  lesson: Lesson = new Lesson();
  Role = Role;
  file: File | null = null;

  constructor(private lessonsService: LessonsServiceService, private userStateService: UserStateService, private userService: UserServiceService,
    private fileService: FileService,   private router: Router  ) { }

  ngOnInit() {
    const currentUser = this.userStateService.getCurrentUser();
    if (currentUser) {
      this.user = currentUser;
      this.user.id = currentUser.id;
      this.userService.getUserByEmail(currentUser.email).subscribe(userDate => {
        this.user.id = userDate.id;
      }
      )
    }
  }
  createLesson(){
    const formData = new FormData();
    if (!this.file) {
      console.warn('Nie wybrano pliku.');
      return;
    }
        formData.append('file', this.file);
    this.lessonsService.createLesson(this.lesson,this.user.id, this.file).subscribe(lesson => {
      console.log(lesson);
       this.router.navigate(['/lesson-list']);
    })
  }

  uploadFile() {
    const formData = new FormData();
    if (!this.file) {
      console.warn('Nie wybrano pliku.');
      return;
    }
    formData.append('file', this.file);
       console.log(formData);
    this.fileService.uploadFile(formData).subscribe(file =>
      console.log(file)
    )
  }

    upload() {
    const formData = new FormData();
    if (!this.file) {
      console.warn('Nie wybrano pliku.');
      return;
    }
    formData.append('file', this.file);
       console.log(formData);
    this.fileService.upload(formData).subscribe(file =>
      console.log(file)
    )
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      console.log(this.file);
    }
  }
}