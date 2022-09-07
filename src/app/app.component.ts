import { Component, OnInit, VERSION } from '@angular/core';
import { map, Observable, Subject, tap, zip } from 'rxjs';

type Durum = ['flat bread', 'meat', 'sauce', 'tomato', 'cabbage'];

let flatBreadCounter = 0;
let meatCounter = 0;
let sauceCounter = 0;
let tomatoCounter = 0;
let cabbageCounter = 0;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  durum$: Observable<Durum>;
  _flarBread = new Subject<'flat bread'>();
  _meat = new Subject<'meat'>();
  _souse = new Subject<'sauce'>();
  _tomato = new Subject<'tomato'>();
  _cabbage = new Subject<'cabbage'>();

  ngOnInit() {
    this,
      (this.durum$ = zip(
        this._flarBread.pipe(
          map((ing) => `${ing}${++flatBreadCounter}`),
          tap(console.log)
        ),
        this._meat.pipe(
          map((ing) => `${ing}${++meatCounter}`),
          tap(console.log)
        ),
        this._souse.pipe(
          map((ing) => `${ing}${++sauceCounter}`),
          tap(console.log)
        ),
        this._tomato.pipe(
          map((ing) => `${ing}${++tomatoCounter}`),
          tap(console.log)
        ),
        this._cabbage.pipe(
          map((ing) => `${ing}${++cabbageCounter}`),
          tap(console.log)
        )
      ).pipe(tap((durum) => console.log('Enjoy' + durum))));
  }
}
