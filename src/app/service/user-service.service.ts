import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  
  private baseUrl = "http://localhost:8082/api/v1/users";

  constructor() { }
}
