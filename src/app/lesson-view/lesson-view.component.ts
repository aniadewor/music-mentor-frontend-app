import { Component } from '@angular/core';
import { LessonsServiceService } from '../service/lessons-service.service';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from '../models/lesson.model';
import { FileService } from '../service/file.service';

@Component({
  selector: 'app-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrl: './lesson-view.component.css'
})
export class LessonViewComponent {
  lesson: Lesson = new Lesson();
  lessonId = this.route.snapshot.paramMap.get('id');
  file: String | null = null;

constructor(private lessonsService: LessonsServiceService, private route: ActivatedRoute, private fileService: FileService){}

    ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 
    if(id != null){
    this.lessonsService.getLessonById(id).subscribe(LessonData => {
      this.lesson = LessonData;
    console.log(this.lesson);
    });
  }
  }

  getFile(){
    this.fileService.getFile(this.lessonId).subscribe(LessonFile => {
    this.file = URL.createObjectURL(LessonFile);
    })
  }
}
