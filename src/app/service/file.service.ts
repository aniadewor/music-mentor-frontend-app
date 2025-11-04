import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = "http://localhost:8082/api/v1/file";

  constructor(private http: HttpClient) { }

  uploadFile(uploadFile: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/uploadFile`, uploadFile, { withCredentials: true });}

  upload(upload:any): Observable<any>{
  let params = new HttpParams()
      .set('file', upload.toString())
      return this.http.post(`${this.baseUrl}/upload`, upload, { params, withCredentials: true });
  }
  getFile(lessonId:any): Observable<any>{
     return this.http.get(`${this.baseUrl}/${lessonId}`, { withCredentials: true });}
  }

