import { Component, OnInit, VERSION } from '@angular/core';
import { map, mergeMap, Observable, Subject, tap, zip, take } from 'rxjs';

type Durum = ['flat bread', 'meat', 'sauce', 'tomato', 'cabbage'];

interface Order {
  amount: number;
  customerId: number;
}
interface Product {
  product: Durum;
  customerId: number;
}

let flatBreadCounter = 0;
let meatCounter = 0;
let sauceCounter = 0;
let tomatoCounter = 0;
let cabbageCounter = 0;

let customerId = 0;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  durum$: Observable<Durum>;
  delivery$: Observable<Product>;
  _order = new Subject<Order>();
  _flarBread = new Subject<'flat bread'>();
  _meat = new Subject<'meat'>();
  _souse = new Subject<'sauce'>();
  _tomato = new Subject<'tomato'>();
  _cabbage = new Subject<'cabbage'>();

  ngOnInit() {
    this.durum$ = zip(
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
    ).pipe(tap((durum) => console.log('Enjoy' + durum)));

    this.delivery$ = this._order.pipe(
      tap((order) => console.log('New order ', order)),
      mergeMap(({ amount, customerId }) =>
        this.durum$.pipe(
          take(amount),
          map((durum) => ({ product: durum, customerId }))
        )
      ),
      tap((product) => console.log('Delivered product ', product))
    );
  }

  dispatchorder(){
    const amount = Math.floor(Math.random() *3) + 1;
    ++customerId;
    this._order.next({amount,customerId})
  }
}

//https://www.youtube.com/watch?v=csRIMubWYnw&list=PLX7eV3JL9sfl8lRNZyzAu8YN-uqrgbhij&index=2&ab_channel=DecodedFrontend

// combineLatest:   Whenever any input stream emits a value, it combines the latest values emitted by each input stream

//It waits for all input streams to have all emitted their n-th value❯As soon as this condition is met, it combines all those n-th values and emits the n-th combined value
