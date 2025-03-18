import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { User } from '../../models/users';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent implements OnInit{
updateUser() {
throw new Error('Method not implemented.');
}
      user: User = {
      firstName: '',
      lastName: '',
      age: 0, 
      email: '',
      id: undefined,
      points: 0,
      image: undefined
    }

    private readonly usersService = inject(UsersService);
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
  
    ngOnInit(): void {
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        this.usersService.getUserById(userId).subscribe({
          next: (user) => {
            this.user = {
              ...user
            };
          },
          error: (error) => {
            console.error('Erreur lors de la récupération du film:', error);
            this.router.navigate(['/admin-users']);
          }
        });
      }
    }
  
    updateMovie(): void {
      this.usersService.updateUser(this.user).subscribe({
        next: () => {
          this.router.navigate(['/admin-users']);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du film:', error);
        }
      });
    }

}