import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonIcon,
IonTextarea,
IonButtons,IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonSelect, IonSelectOption, IonItem, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonToggle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Game } from '../../models/game';
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import { arrowBackOutline, addCircleOutline, personOutline, heartOutline, heart, arrowForwardOutline, home } from 'ionicons/icons';
import { addIcons } from 'ionicons';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput,
    IonSelect, IonSelectOption, IonItem, IonLabel, IonCard, IonCardContent,
    IonCardHeader, IonIcon,
    IonButtons, IonCardTitle, IonToggle, CommonModule, FormsModule
]
})
export class AddPage implements OnInit {
  
  newGame: Partial<Game> = {
    title: '',
    studio: '',
    genre: 'action',
    platform: 'PC',
    cover: 'assets/covers/placeholder.jpg',
    favorite: false,
    achievementsUnlocked: 0,
    achievementsTotal: 0,
    isPopular: false,
    inWishlist: false
  };

  genres: string[] = ['action', 'cosy', 'rpg', 'horror', 'platformer'];
  platforms: string[] = ['PC', 'PS5', 'Xbox Series X', 'Nintendo Switch', 'Mobile'];
  coverImagePreview: string | null = null;

  constructor(private router: Router) { 

    addIcons({'arrowBackOutline':arrowBackOutline,'addCircleOutline':addCircleOutline,'personOutline':personOutline,'heartOutline':heartOutline,'heart':heart,'arrowForwardOutline':arrowForwardOutline,'home':home});
  }

  ngOnInit() {
  }

  onCoverImageSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.coverImagePreview = e.target.result;
        this.newGame.cover = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  addGame(): void {
    if (!this.newGame.title || !this.newGame.studio) {
      alert('Please fill in all required fields');
      return;
    }

    // Generate new ID
    const newId = Math.max(...(this.getGames() as any[]).map(g => g.id), 0) + 1;
    
    const gameToAdd: Game = {
      id: newId,
      title: this.newGame.title!,
      studio: this.newGame.studio!,
      cover: this.newGame.cover!,
      genre: this.newGame.genre!,
      platform: this.newGame.platform!,
      favorite: this.newGame.favorite || false,
      achievementsUnlocked: this.newGame.achievementsUnlocked || 0,
      achievementsTotal: this.newGame.achievementsTotal || 0,
      isPopular: this.newGame.isPopular || false,
      inWishlist: this.newGame.inWishlist || false
    };

    // Save to localStorage (simple persistence)
    const games = this.getGames();
    games.push(gameToAdd);
    localStorage.setItem('customGames', JSON.stringify(games));

    // Reset form
    this.resetForm();
    alert('Game added successfully!');
    this.router.navigate(['/home']);
  }

  getGames(): Game[] {
    const stored = localStorage.getItem('customGames');
    return stored ? JSON.parse(stored) : [];
  }

  resetForm(): void {
    this.newGame = {
      title: '',
      studio: '',
      genre: 'action',
      platform: 'PC',
      cover: 'assets/covers/placeholder.jpg',
      favorite: false,
      achievementsUnlocked: 0,
      achievementsTotal: 0,
      isPopular: false,
      inWishlist: false
    };
    this.coverImagePreview = null;
  }
}
