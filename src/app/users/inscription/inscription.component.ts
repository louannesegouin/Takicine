import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/users';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})

export class InscriptionComponent {
  private readonly usersService = inject(UsersService)
  movies$: Observable<User[]> = this.usersService.getUsers()
}
