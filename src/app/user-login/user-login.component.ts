import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movies';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule],
  providers: [MoviesService],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent implements OnInit {
  rating: number = 0;
  movies: Movie[] = [];
  selectedMovie?: Movie;

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.moviesService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des films:', error);
      }
    });
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
    this.rating = 0;
  }

  submitRating() {
    if (!this.selectedMovie) {
      alert('Veuillez sélectionner un film');
      return;
    }
    console.log(`Note soumise : ${this.rating} pour le film ${this.selectedMovie.title}`);
    alert(`Merci d'avoir noté ${this.selectedMovie.title} ${this.rating}/5 !`);
  }

  rate(value: number) {
    this.rating = value;
  }
}
