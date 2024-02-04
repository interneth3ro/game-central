// Modification of stopwatch service by JanRecker on StackOverflow
// https://stackoverflow.com/a/64680225
import { Injectable } from '@angular/core';
import {
  Observable,
  timer,
  BehaviorSubject,
  Subscription,
  interval,
} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private readonly initialTime: number = 0;

  private timer$: BehaviorSubject<number> = new BehaviorSubject(
    this.initialTime
  );
  private lastStoppedTime: number = this.initialTime;
  private timerSubscrption: Subscription = new Subscription();
  private isRunning: boolean = false;

  constructor() {}

  public get stopWatch$(): Observable<number> {
    return this.timer$;
  }

  start(): void {
    if (this.isRunning) return;

    this.timerSubscrption = interval(5000)
      .pipe(map((value: number): number => value + this.lastStoppedTime))
      .subscribe(this.timer$);

    this.isRunning = true;
  }

  stop(): void {
    this.timerSubscrption.unsubscribe();
    this.isRunning = false;
  }

  reset(): void {
    this.timerSubscrption.unsubscribe();
    this.timer$.next(this.initialTime);
    this.isRunning = false;
  }
}
