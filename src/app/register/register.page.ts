import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
  ]
})
export class RegisterPage {

  name = '';
  username = '';
  email = '';
  password = '';

  constructor(private router: Router) {}

  register() {
    console.log('REGISTER CLICKED');

    localStorage.setItem(
      'user',
      JSON.stringify({
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password
      })
    );

    this.router.navigate(['/login']);
  }
}