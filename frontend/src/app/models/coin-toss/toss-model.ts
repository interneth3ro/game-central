export interface TossModel {
  userId?: string;
  wager?: number;
  choice?: string;
  currentStreak: number;
}

export interface CoinTossResponse {
  result: TossResult;
}

export interface TossResult {
  currentBalance: number;
  currentStreak: number;
  flipResult: string;
  isWin: boolean;
  payout: number;
}
