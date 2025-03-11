import { Component, inject, Input } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movies';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MovieComponent } from './movie/movie.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, MovieComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly moviesService = inject(MoviesService)
  movies$: Observable<Movie[]> = this.moviesService.getMovies()
}
