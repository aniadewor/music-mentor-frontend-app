import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from '../models/lesson.model';
import { filter, Observable } from 'rxjs';
import { Role } from '../models/role.enum';
import { blob, text } from 'node:stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class LessonsServiceService {
  private baseUrl = "http://localhost:8082/api/v1/lessons";

  constructor(private http: HttpClient) { }


// createLesson(lesson: any, userId: number, file: any) {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('lesson', lesson);
//   formData.append('userId', userId.toString());

//   return this.http.post(`${this.baseUrl}/createLesson`, formData, { withCredentials: true });
// }
createLesson(lesson: any, userId: number, file: File): Observable<Lesson> {
    const form = new FormData();
    form.append('file', file); // nazwa musi się zgadzać z @RequestParam/@RequestPart("file")

    // JSON jako osobna część "lesson"
    const lessonBlob = new Blob([JSON.stringify(lesson)], { type: 'application/json' });
    form.append('lesson', lessonBlob, 'lesson.json'); // nazwa "lesson" musi się zgadzać z backendem

    const params = new HttpParams().set('userId', String(userId));

    return this.http.post<Lesson>(`${this.baseUrl}/createLesson`, form, { params });
}
  getLessons(filter: string, role: Role ): Observable<any> {
    let params = new HttpParams()
      .set('filter', filter)
      .set ('role', role)
    return this.http.get(`${this.baseUrl}/getLessons`, {
      params,
      withCredentials: true
    });
  }

  getLessonById(lessonId: string): Observable<any> {
    const params = new HttpParams().set('lessonId', lessonId.toString());
    return this.http.get(`${this.baseUrl}/getLessonsById`, {
      params,
      withCredentials: true
    });
  }
}
