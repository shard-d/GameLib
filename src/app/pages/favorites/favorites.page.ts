import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonSearchbar,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle, IonButton, IonIcon, IonFooter } from '@ionic/angular/standalone';
import { Game } from '../../models/game';
import { heart, heartOutline, arrowBack, arrowBackOutline, home, addCircleOutline, personOutline } from 'ionicons/icons';
import { RouterLink, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {DataPage} from '../../data/dummy-data/data';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonFooter, IonIcon, IonButton, CommonModule,
    FormsModule,
    IonContent,
    RouterLink,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonSearchbar,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FavoritesPage implements OnInit {

  games: Game[] = DataPage;

  searchTerm: string = '';

  selectedGenre: string = 'all';
  selectedStudio: string = 'all';

 
  constructor(private router: Router) {
    addIcons({arrowBackOutline,home,heartOutline,addCircleOutline,personOutline,arrowBack,heart});
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

  get favoriteGames(): Game[] {
    return this.games.filter(game => game.favorite === true);
  }

  get genres(): string[] {
    return [...new Set(this.favoriteGames.map(game => game.genre))];
  }

  get studios(): string[] {
    return [...new Set(this.favoriteGames.map(game => game.studio))];
  }
  get filteredFavorites(): Game[] {
      return this.favoriteGames.filter(game => {
        const matchesSearch =
          game.title.toLowerCase().includes(this.searchTerm.toLowerCase());

        const matchesGenre =
          this.selectedGenre === 'all' || game.genre === this.selectedGenre;

        const matchesStudio =
          this.selectedStudio === 'all' || game.studio === this.selectedStudio;

        return matchesSearch && matchesGenre && matchesStudio;
      });
    }

  toggleFavorite(game: Game): void {
    game.favorite = !game.favorite;
    localStorage.setItem('games', JSON.stringify(this.games));
  }

  ngOnInit() {
    this.loadGames();
  }

}
