import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonTabBar, IonTabButton, IonLabel } from '@ionic/angular/standalone';
import { Game } from '../models/game';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { heart, heartOutline, arrowForwardOutline, 
  home, addCircleOutline, personOutline } from 'ionicons/icons';
import {Router } from '@angular/router';
import{RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [RouterLink,CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonSearchbar, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {

   searchTerm: string = '';

    games: Game[] = [
      {
        id: 1,
        title: 'Minecraft',
        studio: 'Mojang Studios',
        cover: 'assets/covers/placeholder.jpg',
        genre: 'cosy',
        platform: 'PC',
        favorite: false,
        achievementsUnlocked: 12,
        achievementsTotal: 45,
      },
      {
        id: 2,
        title: 'Hades',
        studio: 'Supergiant Games',
        cover: 'assets/covers/placeholder.jpg',
        genre: 'action',
        platform: 'PC',
        favorite: true,
        achievementsUnlocked: 12,
        achievementsTotal: 45,
        isPopular: true,
        inWishlist: true,
      },
      {
        id: 3,
        title: 'Stardew Valley',
        studio: 'ConcernedApe',
        cover: 'assets/covers/placeholder.jpg',
        genre: 'cosy',
        platform: 'PC',
        favorite: false,
        achievementsUnlocked: 12,
        achievementsTotal: 45,
      },
      {
        id: 4,
        title: 'Elden Ring',
        studio: 'FromSoftware',
        cover: 'assets/covers/placeholder.jpg',
        genre: 'rpg',
        platform: 'PC',
        favorite: false,
        achievementsUnlocked: 12,
        achievementsTotal: 45,
        isPopular: true,
      },
      {
        id: 5,
        title: 'Celeste',
        studio: 'Extremely OK Games',
        cover: 'assets/covers/placeholder.jpg',
        genre: 'platformer',
        platform: 'PC',
        favorite: false,
        achievementsUnlocked: 12,
        achievementsTotal: 45,
        inWishlist: true,
      },
      {
        id: 6,
        title: 'Hollow Knight',
        studio: 'Team Cherry',
        cover: 'assets/covers/placeholder.jpg',
        genre: 'platformer',
        platform: 'PC',
        favorite: false,
        achievementsUnlocked: 12,
        achievementsTotal: 45,
      },
      {
        id: 7,
        title: 'Outlast',
        studio: 'Red Barrels',
        cover: 'assets/covers/placeholder.jpg',
        genre: 'horror',
        platform: 'PC',
        favorite: false,
        achievementsUnlocked: 12,
        achievementsTotal: 45,
      },
      {
        id: 8,
        title: 'Blasphemous',
        studio: 'The Game Kitchen',
        cover: 'assets/covers/placeholder.jpg',
        genre: 'platformer',
        platform: 'PC',
        favorite: false,
        achievementsUnlocked: 12,
        achievementsTotal: 45,
      },
      {
        id: 9,
        title: 'Spiritfarer',
        studio: 'Thunder Lotus Games',
        cover: 'assets/covers/placeholder.jpg',
        genre: 'cosy',
        platform: 'PC',
        favorite: false,
        achievementsUnlocked: 12,
        achievementsTotal: 45,
      },
      {
        id: 10,
        title: 'Prey',
        studio: 'Arkane Studios',
        cover: 'assets/covers/placeholder.jpg',
        genre: 'action',
        platform: 'PC',
        favorite: false,
        achievementsUnlocked: 12,
        isPopular: true,
        achievementsTotal: 45,
      },
      {
        id: 11,
        title: 'Dark Souls 3',
        studio: 'FromSoftware',
        cover: 'assets/covers/placeholder.jpg',
        genre: 'rpg',
        platform: 'PC',
        favorite: false,
        achievementsUnlocked: 12,
        achievementsTotal: 45,
        inWishlist: true,
      },
      {
        id: 12,
        title: 'Resident Evil 7',
        studio: 'Capcom',
        cover: 'assets/covers/placeholder.jpg',
        genre: 'horror',
        platform: 'PC',
        favorite: false,
        achievementsUnlocked: 12,
        achievementsTotal: 45,
      }
    ];

    get filteredGames(): Game[] {
      return this.games.filter(game =>
        game.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (!this.continueGame || game.id !== this.continueGame.id)
      );
    }

    toggleFavorite(game: Game): void {
      game.favorite = !game.favorite;
    }

    get continueGame(): Game | null {
      return this.games[0];
    }

    getAchievementProgress(game: Game): number {
      return game.achievementsUnlocked / game.achievementsTotal;
    }

    genres: string[] = ['action', 'cosy', 'rpg', 'horror', 'platformer'];

    getGamesByGenre(genre: string): Game[] {
      return this.games.filter(game =>
        game.genre === genre &&
        (!this.continueGame || game.id !== this.continueGame.id)
      );
    }

    getPopularThisWeek(): Game[] {
      return this.games.filter(game =>
        game.isPopular &&
        (!this.continueGame || game.id !== this.continueGame.id)
      );
    }

    getWishlist(): Game[] {
      return this.games.filter(game =>
        game.inWishlist &&
        (!this.continueGame || game.id !== this.continueGame.id)
      );
    }

    openGame(game: Game): void {
      this.router.navigate(['/game-details', game.id]);
    }

    loadCustomGames(): void {
      const stored = localStorage.getItem('customGames');
      if (stored) {
        try {
          const customGames = JSON.parse(stored);
          this.games = [...this.games, ...customGames];
        } catch (e) {
          console.error('Error loading custom games:', e);
        }
      }
    }
  

  constructor(private router: Router) {
    addIcons({arrowForwardOutline,home,heartOutline,addCircleOutline,personOutline,heart});
    this.loadCustomGames();
  }
}
