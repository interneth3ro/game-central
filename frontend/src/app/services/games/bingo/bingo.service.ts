import { Injectable } from '@angular/core';
import { every, forEach, range, shuffle, take } from 'lodash-es';
import { BingoCell } from '../../../models/bingo/bingo.models';

@Injectable({
  providedIn: 'root',
})
export class BingoService {
  constructor() {}

  private compare(a: number, b: number): number {
    return a - b;
  }

  checkWin(selected: string[]): boolean {
    let result = false;

    const winConditions: string[][] = [
      // columns
      ['B1', 'B2', 'B3', 'B4', 'B5'],
      ['I1', 'I2', 'I3', 'I4', 'I5'],
      ['N1', 'N2', 'N3', 'N4', 'N5'],
      ['G1', 'G2', 'G3', 'G4', 'G5'],
      ['O1', 'O2', 'O3', 'O4', 'O5'],
      // rows
      ['B1', 'I1', 'N1', 'G1', 'O1'],
      ['B2', 'I2', 'I3', 'I4', 'I5'],
      ['B3', 'I3', 'N3', 'G3', 'O5'],
      ['B4', 'I4', 'N4', 'G4', 'O4'],
      ['B5', 'I5', 'N5', 'G5', 'O5'],
      // diagonal
      ['B1', 'I2', 'N3', 'G4', 'O5'],
      ['B5', 'I4', 'N3', 'G2', 'O1'],
    ];

    winConditions.forEach((winCon) => {
      if (selected.every((n) => winCon.includes(n))) {
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
    forEach(range(5), (i: number) => {
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
