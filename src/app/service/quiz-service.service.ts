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
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(`${this.baseUrl}/getQuizById`, {
      params,
      withCredentials: true
    });
  }
  getQuizzesByUserId(userId: number): Observable<any> {
  const params = new HttpParams().set('userId', userId.toString());
  return this.http.get(`${this.baseUrl}/getQuizzesByUserId`, {
    params,
    withCredentials: true
  });
}
updateClassName(quizId: number, classNames: string[]): Observable<any> {
  let params = new HttpParams().set('quizId', quizId.toString());
  classNames.forEach(className => {
    params = params.append('className', className);
  });
  return this.http.post(
    `${this.baseUrl}/updateClassName`,
    {},
    { params, withCredentials: true }
  );
}
getQuizzesByClass(className: string, userId: number): Observable<any>{
    let params = new HttpParams()
    .set('className', className)
    .set('userId', userId.toString());
  return this.http.post(`${this.baseUrl}/getQuizzesByClass`,{}, {params, withCredentials: true});
}
getUserQuizDate(userId: string): Observable<any>{
 const params = new HttpParams().set('userId', userId);
 return this.http.get(`${this.baseUrl}/getUserQuizDate`, {
    params,
    withCredentials: true
  });
}
getTeacherQuizDate(className: string): Observable<any>{
  const params = new HttpParams().set('className', className);
  return this.http.get(`${this.baseUrl}/getTeacherQuizDate`, {
    params,
    withCredentials: true
});
}
}
