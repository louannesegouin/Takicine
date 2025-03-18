import { Component, Input } from '@angular/core';
import { User } from '../../models/users';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})

export class UserComponent {
  @Input({required: true}) user!: User
}
