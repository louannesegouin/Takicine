import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/users';
import { AsyncPipe } from '@angular/common';
import { UserComponent } from './user/user.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [AsyncPipe, UserComponent, CommonModule, RouterLink],  
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})

export class AdminUsersComponent implements OnInit {

  private readonly usersService = inject(UsersService);

  users!: User[];
  ngOnInit(): void {
    this.usersService.getUsers().subscribe(users => this.users = users);
  }
  
  deleteUser(id: number | undefined): void {
    if (id === undefined) {
      return;
    }
    this.usersService.deleteUser(id).subscribe(() => 
        this.users = this.users.filter(user => user.id !== id)
    );
  }

}