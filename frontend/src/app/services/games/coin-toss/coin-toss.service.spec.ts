import { TestBed } from '@angular/core/testing';

import { CoinTossService } from './coin-toss.service';

describe('CoinTossService', () => {
  let service: CoinTossService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinTossService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
