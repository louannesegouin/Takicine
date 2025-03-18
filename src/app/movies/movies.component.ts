import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movies';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit {
  private readonly moviesService = inject(MoviesService);

  movies!: Movie[];
  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(movies => this.movies = movies);
  }  

  deleteMovie(id: number | undefined): void {
    if (id === undefined) {
      return;
    }
    this.moviesService.deleteMovie(id).subscribe(() => 
        this.movies = this.movies.filter(film => film.id !== id)
    );
  }

}

