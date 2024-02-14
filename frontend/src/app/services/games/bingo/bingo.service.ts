import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { range, shuffle, take } from 'lodash-es';
import { BingoCell } from '../../../models/bingo/bingo.models';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class BingoService {
  constructor() {}

  public messages$: BehaviorSubject<string> = new BehaviorSubject('');
  private socket = io('http://localhost:8080/bingo', {
    query: { room: 'lobby' },
  });

  private compare(a: number, b: number): number {
    return a - b;
  }

  public getMessage = (): Observable<string> => {
    this.socket.on('message', (message) => {
      this.messages$.next(message);
    });
    return this.messages$.asObservable();
  };

  public sendMessage = (message: string): void => {
    this.socket.emit('chat:message', message);
  };

  checkWin(selected: string[]): boolean {
    let result = false;

    const winConditions = [
      ['B1', 'I1', 'N1', 'G1', 'O1'],
      ['B2', 'I2', 'N2', 'G2', 'O2'],
      ['B3', 'I3', 'N3', 'G3', 'O3'],
      ['B4', 'I4', 'N4', 'G4', 'O4'],
      ['B5', 'I5', 'N5', 'G5', 'O5'],
      ['B1', 'B2', 'B3', 'B4', 'B5'],
      ['I1', 'I2', 'I3', 'I4', 'I5'],
      ['N1', 'N2', 'N3', 'N4', 'N5'],
      ['G1', 'G2', 'G3', 'G4', 'G5'],
      ['O1', 'O2', 'O3', 'O4', 'O5'],
      ['B1', 'I2', 'N3', 'G4', 'O5'],
      ['B5', 'I4', 'N3', 'G2', 'O1'],
    ];

    winConditions.forEach((winCon) => {
      if (winCon.every((n) => selected.includes(n))) {
        result = true;
      }
    });

    return result;
  }

  getCard(): BingoCell[][] {
    const bValues = take(shuffle(range(1, 16)), 5).sort(this.compare);
    const iValues = take(shuffle(range(16, 31)), 5).sort(this.compare);
    const tempNValues = take(shuffle(range(31, 46)), 4).sort(this.compare);
    const gValues = take(shuffle(range(46, 61)), 5).sort(this.compare);
    const oValues = take(shuffle(range(61, 76)), 5).sort(this.compare);

    // -1 represents free space
    const nValues = [...tempNValues.slice(0, 2), -1, ...tempNValues.slice(2)];

    // return array of arrays organized into rows for easier rendering
    const card: BingoCell[][] = [];
    [0, 1, 2, 3, 4].forEach((i: number) => {
      const row: BingoCell[] = [
        {
          id: `B${i + 1}`,
          selected: false,
          value: bValues[i].toString(),
        },
        {
          id: `I${i + 1}`,
          selected: false,
          value: iValues[i].toString(),
        },
        {
          id: `N${i + 1}`,
          selected: nValues[i] < 0,
          value: nValues[i] < 0 ? 'FREE' : nValues[i].toString(),
        },
        {
          id: `G${i + 1}`,
          selected: false,
          value: gValues[i].toString(),
        },
        {
          id: `O${i + 1}`,
          selected: false,
          value: oValues[i].toString(),
        },
      ];
      card.push(row);
    });

    return card;
  }
}
