import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerServiceService {
  private baseUrl = "http://localhost:8082/api/v1/answers";

  constructor(private http:HttpClient) {}
  
  saveQuizAnswer(quizId: string, userId: number, questionIdList:number[],studentAnswerList: string[]): Observable<any>{
        let params = new HttpParams()
        .set('quizId', quizId.toString())
        .set('userId', userId.toString())
        .set('questionIdList', questionIdList.toString())
        .set('studentAnswerList', studentAnswerList.toString())
     return this.http.post(`${this.baseUrl}/saveQuizAnswer`,{}, {params, withCredentials: true });
  }
  
checkQuizCorrectAnswer(quizId:number, userId: number): Observable<any>{
        let params = new HttpParams()
        .set('quizId', quizId.toString())
        .set('userId', userId.toString())
     return this.http.post(`${this.baseUrl}/checkQuizCorrectAnswer`,{}, {params, withCredentials: true });
  }
}