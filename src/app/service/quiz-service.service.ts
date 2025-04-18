import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {

  private baseUrl = "http://localhost:8082/api/v1/quizzes";

  constructor(private http:HttpClient) { }
  addQuiz(quiz:any) : Observable<any>{
    return this.http.post(`${this.baseUrl}/addQuiz`, quiz);
  }
  addQuestions(question:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addQuestion`, question);
  }
  getQuizById(id:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/getQuizById`, id);
  }
  updateQuizScore(quizid:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateQuizScore`, quizid);
}

}
