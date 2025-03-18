import { inject, Injectable } from '@angular/core';
import { Movie } from '../models/movies';
import { map, Observable, filter } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly httpClient = inject(HttpClient)
  private readonly url = "http://localhost:8080/movies"

  constructor() {}

  getBaseUrl(): string {
    return this.url;
  }

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.url).pipe(map((movies)=>movies.sort((a, b) => a.id! - b.id!)));
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.httpClient.post<Movie>(this.url, movie);
  }

  deleteMovie(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }

  getMovieById(id: string): Observable<Movie> {
    return this.httpClient.get<Movie>(`${this.url}/${id}`);
  }

  updateMovie(movie: Movie): Observable<void> {
    return this.httpClient.put<void>(`${this.url}/${movie.id}`, movie);
  }

  getMovieImage(id: number): Observable<string> {
    return this.httpClient.get(`${this.url}/${id}/image`, { responseType: 'text' });
  }

  uploadPhoto(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('filmImage', file);

    return this.httpClient.put(`${this.url}/${id}/image`, formData, {
      headers: new HttpHeaders({
        'accept': '*/*'
      }),
      reportProgress: true,
      observe: 'events'
    }).pipe(
      filter(event => event.type === HttpEventType.Response),
      map(() => `${this.url}/${id}/image`)
    );
  }
}
