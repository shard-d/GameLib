import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonFooter,
  IonToolbar,
  IonButtons, IonHeader, IonTitle, IonProgressBar } from '@ionic/angular/standalone';
import { RouterLink, Router } from '@angular/router';
import { Game } from '../../models/game';
import { addIcons } from 'ionicons';
import { arrowForwardOutline, home, heartOutline, addCircleOutline, personOutline, heart } from 'ionicons/icons';
import {DataPage} from '../../data/dummy-data/data';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
  standalone: true,
  imports: [IonProgressBar, IonTitle, IonHeader, 
    CommonModule,
    RouterLink,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonFooter,
    IonToolbar,
    IonButtons
  ]
})
export class GamesPage implements OnInit {

  username: string = 'Mika';
  userTitle: string = 'Game Collector';

  avatarImage: string = 'assets/covers/placeholder.jpg';
  bannerImage: string = 'assets/covers/banner.jpg';
  games: Game[] = DataPage;

  constructor(private router: Router) {
      addIcons({arrowForwardOutline,home,heartOutline,addCircleOutline,personOutline,heart});
      
    }



  loadGames(): void {
    const stored = localStorage.getItem('customGames');
    if (stored) {
      try {
        const customGames = JSON.parse(stored);
        this.games = Array.isArray(customGames)
          ? [...DataPage, ...customGames]
          : DataPage;
      } catch (e) {
        console.error('Error loading games:', e);
        this.games = DataPage;
      }
    } else {
      this.games = DataPage;
    }
  }


  ngOnInit() {
    this.loadGames();
  }

  get gamesOwned(): number {
    return this.games.length;
  }

  get totalAchievements(): number {
    return this.games.reduce((total, game) => {
      return total + (game.achievementsUnlocked || 0);
    }, 0);
  }

  get timePlayed(): number {
    return this.gamesOwned * 12;
  }

  get favoriteGames(): Game[] {
    return this.games
      .filter(game => game.favorite)
      .slice(0, 5);
  }





  get continueGame(): Game | null {
      return this.games[0];
    }

  getAchievementProgress(game: Game): number {
    return game.achievementsUnlocked / game.achievementsTotal;
  }

  openGame(game: Game): void {
    this.router.navigate(['/game-details', game.id]);
  }

  toggleFavorite(game: Game): void {
      game.favorite = !game.favorite;
    }

}
