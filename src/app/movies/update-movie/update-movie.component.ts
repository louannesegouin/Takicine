import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Movie } from '../../models/movies';
import { FormsModule } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-update-movie',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './update-movie.component.html',
  styleUrl: './update-movie.component.scss'
})
export class UpdateMovieComponent {
movie: Movie = {
  title: '',
  director: '',
  releaseDate: new Date(),
  synopsis: '',
  id: undefined,
  rate: undefined, 
  image: undefined
}
  private readonly moviesService = inject(MoviesService)
  private readonly router = inject(Router)
  
  updateMovie(): void {
    if (!this.movie || !this.movie.id) {
      return;
  }
  this.moviesService.updateMovie(this.movie).subscribe({
    next: () => {
        this.router.navigate(['/movies']);
    },
});

}}
