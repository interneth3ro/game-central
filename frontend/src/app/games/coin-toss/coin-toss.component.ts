import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { selectCurrentUser } from '../../store/auth/selectors';
import { CoinTossService } from '../../services/games/coin-toss/coin-toss.service';
import { User } from '../../models/user/user.model';
import { TossModel, TossResult } from 'src/app/models/coin-toss/toss-model';

interface HistoryItem {
  choice?: string;
  wager?: number;
  result: string;
  isWin: boolean;
  payout: number;
}

@Component({
  selector: 'app-coin-toss',
  templateUrl: './coin-toss.component.html',
  styleUrl: './coin-toss.component.scss',
})
export class CoinTossComponent implements OnInit {
  public currentUser: User | null = null;
  public currentStreak: number = 0;
  public isWin: boolean = false;
  public coinTossed: boolean = false;
  public historyItems: HistoryItem[] = [];
  coinTossForm: FormGroup = new FormGroup({
    wager: new FormControl('', [Validators.required]),
    choice: new FormControl('heads'),
  });

  constructor(
    private coinTossService: CoinTossService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(selectCurrentUser)).subscribe((currentUser) => {
      this.currentUser = currentUser;
    });
  }

  private capitalize(val?: string) {
    if (!val) return '';

    return val.charAt(0).toUpperCase() + val.slice(1);
  }

  onSubmit() {
    this.coinTossed = false;
    const payload: TossModel = {
      userId: this.currentUser?.userId,
      wager: this.coinTossForm.get('wager')?.value,
      choice: this.coinTossForm.get('choice')?.value,
      currentStreak: this.currentStreak,
    };

    this.coinTossService.tossCoin(payload).subscribe((response) => {
      this.coinTossed = true;
      this.isWin = response.result.isWin;
      this.currentStreak = response.result.currentStreak;

      const historyItem: HistoryItem = {
        choice: this.capitalize(payload.choice),
        wager: payload.wager,
        isWin: response.result.isWin,
        result: this.capitalize(response.result.flipResult),
        payout: response.result.payout,
      };

      const results = [...this.historyItems];
      results.unshift(historyItem);
      if (results.length > 10) {
        results.pop();
      }
      this.historyItems = results;
      // this.store.dispatch(
      //   updateTokens({ payload: response.result.currentBalance })
      // );
    });

    return false;
  }
}
