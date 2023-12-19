import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  BehaviorSubject,
  ReplaySubject,
  combineLatest,
  concatMap,
  delay,
  filter,
  iif,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  takeUntil,
  takeWhile,
  tap,
  withLatestFrom,
} from 'rxjs';

type SortItem = {
  value: number;
  color: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet],
})
export class AppComponent {
  quickSort(arr: SortItem[]) {
    let animationItems$ = new BehaviorSubject<SortItem[]>(arr);
    const n = arr.length;
    animationItems$.next(arr);

    for (let i = 0; i < n; i++) {
      let min = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j].value < arr[min].value) {
          min = j;
        }
        animationItems$.next([...arr]);
      }
      swap(arr, min, i);
    }

    return animationItems$;
  }

  insertionSort(arr: SortItem[]) {
    let animationItems$ = new BehaviorSubject<SortItem[]>(arr);
    const n = arr.length;
    animationItems$.next(arr);
    for (let i = 1; i < n; i++) {
      let j = i;

      animationItems$.next([...arr]);
      while (j > 0 && arr[j - 1].value > arr[j].value) {
        swap(arr, j, j - 1);
        j = j - 1;
        animationItems$.next([...arr]);
      }
    }
    return animationItems$;
  }

  speed$ = new BehaviorSubject<number>(1000000000000000000000000000000000);
  size$ = new BehaviorSubject<number>(35);
  breakSort$() {
    this.sortAlgorithm$.next(([]) => {
      return new BehaviorSubject<SortItem[]>([]);
    });
  }

  sortAlgorithm$ = new ReplaySubject<
    (arr: SortItem[]) => BehaviorSubject<SortItem[]>
  >();

  randomize$() {
    this.sortAlgorithm$.pipe(take(1)).subscribe((algo) => {
      this.sortAlgorithm$.next(algo);
    });
  }

  sort_animation$ = this.sortAlgorithm$.pipe(
    withLatestFrom(this.size$),
    map(([sortAlgorithm, size]) => {
      return sortAlgorithm(generateRandomArray(size));
    }),
    withLatestFrom(this.speed$),
    concatMap(([items, speed]) => {
      return items.pipe(delay(speed));
    })
  );

  startBubbleSort() {
    this.sortAlgorithm$.next(this.bubbleSort$);
  }

  bubbleSort$(arr: SortItem[]) {
    let animationItems$ = new BehaviorSubject<SortItem[]>(arr);
    const n = arr.length;
    animationItems$.next(arr);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j].value < arr[j + 1].value) {
          swap(arr, j, j + 1);
        }

        animationItems$.next([...arr]); // Create a new array to trigger change detection
      }
    }

    return animationItems$;
  }
}

function generateRandomArray(size: number): SortItem[] {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push({
      value: Math.floor(Math.random() * 400),
      color: 'white',
    });
  }
  return arr;
}

function swap(arr: SortItem[], l: number, r: number) {
  const temp = arr[l];
  arr[l] = arr[r];
  arr[r] = temp;
}
