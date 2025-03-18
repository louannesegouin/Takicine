import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movies';
import { FormsModule } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-movie',
  standalone: true,
  imports: [RouterLink, FormsModule, DatePipe],
  templateUrl: './update-movie.component.html',
  styleUrl: './update-movie.component.scss'
})
export class UpdateMovieComponent implements OnInit {
  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined
  }

  private readonly moviesService = inject(MoviesService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.moviesService.getMovieById(movieId).subscribe({
        next: (movie) => {
          this.movie = {
            ...movie,
            releaseDate: new Date(movie.releaseDate)
          };
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du film:', error);
          this.router.navigate(['/movies']);
        }
      });
    }
  }

  updateMovie(): void {
    this.moviesService.updateMovie(this.movie).subscribe({
      next: () => {
        this.router.navigate(['/movies']);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du film:', error);
      }
    });
  }
}
