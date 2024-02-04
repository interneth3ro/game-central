import { Component, OnDestroy, OnInit } from '@angular/core';
import { BingoService } from '../../services/games/bingo/bingo.service';
import { TimerService } from '../../services/games/bingo/timer.service';
import { BingoCell } from '../../models/bingo/bingo.models';
import { shuffle, find, forEach } from 'lodash-es';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.component.html',
  styleUrl: './bingo.component.scss',
})
export class BingoComponent implements OnInit, OnDestroy {
  public cardValues: BingoCell[][] = [];
  public selectedCells: string[] = [];
  public allCalls: string[] = [];
  public calledNumbers: string[] = []; // for displaying call history
  public calledCells: string[] = ['N3']; // for validating selections against called, initialized with free space
  public currentCalledNumber: string = '';
  public gameStarted: boolean = false;
  public bingoCalled: boolean = false;
  public isWinner: boolean = false;
  public hasInvalidSelections: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private bingoService: BingoService,
    private timerService: TimerService
  ) {
    this.subscription.add(
      this.timerService.stopWatch$.subscribe(() => this.callNumber())
    );
  }

  ngOnInit(): void {
    this.cardValues = this.bingoService.getCard();
    this.allCalls = [
      'B1',
      'B2',
      'B3',
      'B4',
      'B5',
      'B6',
      'B7',
      'B8',
      'B9',
      'B10',
      'B11',
      'B12',
      'B13',
      'B14',
      'B15',
      'I16',
      'I17',
      'I18',
      'I19',
      'I20',
      'I21',
      'I22',
      'I23',
      'I24',
      'I25',
      'I26',
      'I27',
      'I28',
      'I29',
      'I30',
      'N31',
      'N32',
      'N33',
      'N34',
      'N35',
      'N36',
      'N37',
      'N38',
      'N39',
      'N40',
      'N41',
      'N42',
      'N43',
      'N44',
      'N45',
      'G46',
      'G47',
      'G48',
      'G49',
      'G50',
      'G51',
      'G52',
      'G53',
      'G54',
      'G55',
      'G56',
      'G57',
      'G58',
      'G59',
      'G60',
      'O61',
      'O62',
      'O63',
      'O64',
      'O65',
      'O66',
      'O67',
      'O68',
      'O69',
      'O70',
      'O71',
      'O72',
      'O73',
      'O74',
      'O75',
    ];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  startGame(): void {
    this.gameStarted = true;
    this.selectedCells.push('N3'); // FREE space
    this.timerService.start();
  }

  callBingo(): void {
    this.timerService.stop();
    this.bingoCalled = true;
    if (!this.validateSelections()) {
      this.hasInvalidSelections = true;
    } else {
      this.isWinner = this.bingoService.checkWin(this.selectedCells);
    }
  }

  stopGame(): void {
    this.stopTimer();
  }

  stopTimer(): void {
    this.timerService.stop();
  }

  resumeGame(): void {
    this.bingoCalled = false;
    this.hasInvalidSelections = false;
    this.isWinner = false;
    this.timerService.start();
  }

  validateSelections(): boolean {
    let result = true;
    forEach(this.selectedCells, (n) => {
      if (!this.calledCells.includes(n)) {
        result = false;
      }
    });

    return result;
  }

  reset(): void {
    this.timerService.reset();
  }

  selectCell(cell: BingoCell): void {
    cell.selected = !cell.selected;
    if (cell.selected) {
      this.selectedCells.push(cell.id);
    } else {
      const idx = this.selectedCells.indexOf(cell.id);
      if (idx !== -1) {
        this.selectedCells.splice(idx, 1);
      }
    }
  }

  callNumber(): void {
    const shuffled = shuffle(this.allCalls);
    const called = shuffled[0];

    if (called) {
      const idx = this.allCalls.indexOf(called);
      if (idx !== -1) {
        this.allCalls.splice(idx, 1);
      }

      this.calledNumbers.unshift(called);
      const calledCell = this.findCalledCell(called);
      if (calledCell) {
        this.calledCells.push(calledCell.id);
      }
      this.currentCalledNumber = called;
    }
  }

  findCalledCell(called: string): BingoCell | null {
    const value = called.substring(1);
    const calledCell = find(this.cardValues.flat(), { value });
    if (!calledCell) {
      return null;
    } else {
      return calledCell;
    }
  }
}
