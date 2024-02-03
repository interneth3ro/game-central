import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { selectCurrentUser } from '../../store/auth/selectors';
import { updateTokens } from '../../store/auth/actions';
import { CoinTossService } from '../../services/games/coin-toss/coin-toss.service';
import { CurrentUser } from '../../store/auth/state';
import { TossModel, TossResult } from 'src/app/models/coin-toss/toss-model';

interface HistoryItem {
  choice?: string;
  wager?: number;
  result: string;
  isWin: boolean;
}

@Component({
  selector: 'app-coin-toss',
  templateUrl: './coin-toss.component.html',
  styleUrl: './coin-toss.component.scss',
})
export class CoinTossComponent implements OnInit {
  public currentUser: CurrentUser | null = null;
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

  onSubmit(): void {
    this.coinTossed = false;
    const payload: TossModel = {
      userId: this.currentUser?.id,
      wager: this.coinTossForm.get('wager')?.value,
      choice: this.coinTossForm.get('choice')?.value,
      currentStreak: this.currentStreak,
    };

    this.coinTossService.tossCoin(payload).subscribe({
      next: (response) => {
        this.coinTossed = true;
        this.isWin = response.result.isWin;

        const historyItem: HistoryItem = {
          choice: this.capitalize(payload.choice),
          wager: payload.wager,
          isWin: response.result.isWin,
          result: this.capitalize(response.result.flipResult),
        };

        const results = [...this.historyItems];
        results.unshift(historyItem);
        if (results.length > 10) {
          results.pop();
        }
        this.historyItems = results;
        this.store.dispatch(
          updateTokens({ payload: response.result.currentBalance })
        );
      },
      error: () => {},
    });
  }
}
