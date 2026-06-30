export interface Game {
    id: number;
    title: string;
    studio: string;
    cover: string;
    genre: string;
    platform: string;
    favorite: boolean;
    achievementsUnlocked: number;
    achievementsTotal: number;
    isPopular?: boolean;
    inWishlist?: boolean;
}
