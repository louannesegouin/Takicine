import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/users';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})

export class AddUserComponent {
user: User = {
  firstName: '',
  lastName: '',
  age: 0,
  email: '',
  id: undefined,
  points: 0, 
  image: undefined
}
  private readonly usersService = inject(UsersService)
  private readonly router = inject(Router)
  
  addUser(): void {
    this.usersService.addUser(this.user).subscribe(
        () => this.router.navigate(['/monespace'])
    );
  }
}
