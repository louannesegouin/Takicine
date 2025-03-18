import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private readonly httpClient = inject(HttpClient)
  private readonly url = "http://localhost:8080/users"

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url).pipe(map((users)=>users.sort((a, b) => a.id! - b.id!)));
  }

  addUser(user: User): Observable<void> {
    return this.httpClient.post<void>(this.url, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/${id}`);
  }

  updateUser(user: User): Observable<void> {
    return this.httpClient.put<void>(`${this.url}/${user.id}`, user);
  }

}

