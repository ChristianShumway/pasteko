import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, timer} from 'rxjs';
import {takeUntil, takeWhile, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  counter = 0;
  timerSubject = new BehaviorSubject<number>(0);

  constructor() {
  }

  getTime(timeLimit: number) {
    if(this.counter === 0) {
      timer(1000, 1000) //Initial delay 1 seconds and interval countdown also 1 second
      .pipe(
        takeWhile( () => this.counter < timeLimit ),
        tap(() => this.counter++)
      )
      .subscribe( () => {
        this.timerSubject.next(this.counter);
      });
    }
  }

  addTime(time: number) {
    this.counter-= time;
  }

  resetTime() {
    this.counter = 0;
    console.log('entro qaui')
    this.timerSubject.complete();
  }

  watchTimer(): Observable<any> {
    return this.timerSubject.asObservable();
  }
}
