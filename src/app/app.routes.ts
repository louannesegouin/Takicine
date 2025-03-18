import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { UpdateMovieComponent } from './movies/update-movie/update-movie.component';
import { AddPhotoComponent } from './movies/add-photo/add-photo.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'movies', component: MoviesComponent},
    { path: 'add-movie', component: AddMovieComponent},
    { path: 'update-movie/:id', component: UpdateMovieComponent},
    { path: 'add-photo/:id', component: AddPhotoComponent},
    { path: 'admin', component: AdminComponent}
];
