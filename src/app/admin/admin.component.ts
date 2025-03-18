import { Component, inject, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { UsersService } from '../services/users.service';
import { User } from '../models/users';
import { Movie } from '../models/movies';
import { RouterLink } from '@angular/router';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit, AfterViewInit {
  @ViewChild('movieRatingsChart') chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  private readonly moviesService = inject(MoviesService);
  private readonly usersService = inject(UsersService);
  private chart: Chart | null = null;
  
  movies: Movie[] = [];
  movieCount: number = 0;
  users: User[] = [];
  userCount: number = 0;
  private dataLoaded = false;

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(movies => {
      this.movies = movies;
      this.movieCount = movies.length;
      this.dataLoaded = true;
      if (this.chartCanvas) {
        this.createRatingsChart();
      }
    });
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
      this.userCount = users.length;
    });
  }

  ngAfterViewInit() {
    if (this.dataLoaded) {
      this.createRatingsChart();
    }
  }

  private createRatingsChart(): void {
    if (!this.chartCanvas || !this.movies || this.movies.length === 0) return;

    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = this.movies.map(movie => movie.title);
    const ratings = this.movies.map(movie => {
      const rating = parseFloat(movie.rate?.toString() || '0');
      return isNaN(rating) ? 0 : rating;
    });

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Notes moyennes des films',
          data: ratings,
          backgroundColor: '#3498DB',
          borderColor: '#2980B9',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            title: {
              display: true,
              text: 'Notes'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Films'
            }
          }
        }
      }
    });
  }
}