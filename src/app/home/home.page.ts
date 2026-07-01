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
import { DataPage } from '../data/dummy-data/data';
import{OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [RouterLink,CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonSearchbar, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {

   searchTerm: string = '';
   games: Game[] = DataPage;

    

    get filteredGames(): Game[] {
      return this.games.filter(game =>
        game.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (!this.continueGame || game.id !== this.continueGame.id)
      );
    }

    toggleFavorite(game: Game): void {
      game.favorite = !game.favorite;

      localStorage.setItem('games', JSON.stringify(this.games));
    }


    get continueGame(): Game | null {
      return this.games[0];
    }

    getAchievementProgress(game: Game): number {
      return game.achievementsUnlocked / game.achievementsTotal;
    }

   

    get genres(): string[] {
      return [...new Set(this.games.map(game => game.genre))];
    }

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

    loadGames(): void {
      const stored = localStorage.getItem('games');

      if (stored) {
        this.games = JSON.parse(stored);
      } else {
        this.games = DataPage;
        localStorage.setItem('games', JSON.stringify(this.games));
      }
    }
    ngOnInit() {
      this.loadGames();
    }
  

  constructor(private router: Router) {
    addIcons({arrowForwardOutline,home,heartOutline,addCircleOutline,personOutline,heart});
  }
}
