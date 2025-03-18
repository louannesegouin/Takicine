import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movies';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-add-photo',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './add-photo.component.html',
  styleUrl: './add-photo.component.scss'
})
export class AddPhotoComponent implements OnInit {
  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined
  };

  private readonly moviesService = inject(MoviesService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  currentImageUrl: string | null = null;

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.moviesService.getMovieById(movieId).subscribe({
        next: (movie) => {
          this.movie = {
            ...movie,
            releaseDate: new Date(movie.releaseDate)
          };
          if (movie.id) {
            this.currentImageUrl = `${this.moviesService.getBaseUrl()}/${movie.id}/image`;
          }
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du film:', error);
          this.router.navigate(['/movies']);
        }
      });
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file;
    
    // Créer l'aperçu
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updatePhoto(): void {
    if (!this.selectedFile) {
      alert('Veuillez sélectionner une image');
      return;
    }
  
    if (!this.movie.id) {
      alert('Erreur: ID du film non trouvé');
      return;
    }
  
    // Vérifier si une photo existe déjà
    if (this.movie.image) {
      if (!confirm('Une photo existe déjà pour ce film. Voulez-vous la remplacer ?')) {
        return;
      }
    }
  
    // Upload de la photo
    this.moviesService.uploadPhoto(this.movie.id, this.selectedFile).subscribe({
      next: () => {
        alert('Photo ajoutée avec succès !');
        this.router.navigate(['/movies']);
      },
      error: (error) => {
        console.error('Erreur lors de l\'upload de la photo:', error);
        alert('Erreur lors de l\'ajout de la photo');
      }
    });
  }
}

