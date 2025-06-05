import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl = "http://localhost:8082/api/v1/users";

  constructor(private http:HttpClient) { }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/registerUser`, user);
  }
  loginUser (email:string, password:string):Observable<any> {
    return this.http.post(`${this.baseUrl}/loginUser`, {email, password});
  }
  getUserById (id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
  }
  getUserByEmail(email:string):Observable<any> {
    return this.http.get(`${this.baseUrl}/email/${email}`,{ withCredentials: true })
  }
  getUserBySchoolName(schoolName:string):Observable<any> {
    return this.http.get(`${this.baseUrl}/getBySchoolName`,{ withCredentials: true })
  }
}
