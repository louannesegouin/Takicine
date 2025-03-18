import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private readonly httpClient = inject(HttpClient)
  private readonly url = "http://localhost:8080/users"

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url);
  }

}
