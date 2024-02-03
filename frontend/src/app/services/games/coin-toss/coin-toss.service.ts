import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  TossModel,
  CoinTossResponse,
} from '../../../models/coin-toss/toss-model';

const BASE_URL: string = 'http://localhost:5000/api/user';

@Injectable({
  providedIn: 'root',
})
export class CoinTossService {
  constructor(private httpClient: HttpClient) {}

  tossCoin(payload: TossModel) {
    return this.httpClient.post<CoinTossResponse>(
      `${BASE_URL}/coinToss`,
      payload
    );
  }
}
