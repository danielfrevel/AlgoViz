import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  BehaviorSubject,
  concatMap,
  delay,
  mergeMap,
  of,
  switchMap,
  tap,
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
  quickSort() {
    let arr = generateRandomArray();
    const n = arr.length;
    this.animationItems$.next(arr);
  }

  insertionSort() {
    let arr = generateRandomArray();
    const n = arr.length;
    this.animationItems$.next(arr);
    for (let i = 1; i < n; i++) {
      let j = i;

      this.animationItems$.next([...arr]);
      while (j > 0 && arr[j - 1].value > arr[j].value) {
        swap(arr, j, j - 1);
        j = j - 1;
        this.animationItems$.next([...arr]);
      }
    }
  }
  animationItems$ = new BehaviorSubject<SortItem[]>(generateRandomArray());

  animation$ = this.animationItems$.pipe(
    concatMap((item) => of(item).pipe(delay(1)))
  );

  randomize() {
    this.animationItems$.next(generateRandomArray());
  }

  bubbleSort() {
    let arr = generateRandomArray();
    const n = arr.length;
    this.animationItems$.next(arr);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j].value < arr[j + 1].value) {
          swap(arr, j, j + 1);
        }

        this.animationItems$.next([...arr]); // Create a new array to trigger change detection
      }
    }
  }
}

function generateRandomArray(): SortItem[] {
  const arr = [];
  for (let i = 0; i < 50; i++) {
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
