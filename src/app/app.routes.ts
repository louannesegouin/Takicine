import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { UpdateMovieComponent } from './movies/update-movie/update-movie.component';
import { AddPhotoComponent } from './movies/add-photo/add-photo.component';
import { AdminComponent } from './admin/admin.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { UpdateUserComponent } from './admin-users/update-user/update-user.component';
import { AddUserComponent } from './admin-users/add-user/add-user.component';
import { LoginComponent } from './login/login.component';
import { UserLoginComponent } from './user-login/user-login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'movies', component: MoviesComponent},
    { path: 'add-movie', component: AddMovieComponent},
    { path: 'update-movie/:id', component: UpdateMovieComponent},
    { path: 'add-photo/:id', component: AddPhotoComponent},
    { path: 'admin', component: AdminComponent},
    { path: 'admin-users', component: AdminUsersComponent},
    { path: 'update-user/:id', component: UpdateUserComponent},
    { path: 'add-user', component: AddUserComponent},
    { path: 'login', component: LoginComponent},
    { path: 'user-login', component: UserLoginComponent}
];
