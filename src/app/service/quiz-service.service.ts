import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {

  private baseUrl = "http://localhost:8082/api/v1/quizzes";

  constructor(private http:HttpClient) { }
  addQuiz(quiz:any) : Observable<any>{
    return this.http.post(`${this.baseUrl}/addQuiz`, quiz, { withCredentials: true });
  }
  addQuestions(question:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addQuestions`, question, { withCredentials: true });
  }
  getQuizById(id:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/getQuizById`, id);
  }
  getQuizzesByUserId(userId: number): Observable<any> {
  const params = new HttpParams().set('userId', userId.toString());
  return this.http.get(`${this.baseUrl}/getQuizzesByUserId`, {
    params,
    withCredentials: true
  });
}
}