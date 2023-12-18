import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, concatMap, delay, of } from 'rxjs';

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
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
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
        this.animationItems$.next([...arr]); // Create a new array to trigger change detection
        if (arr[j].value < arr[j + 1].value) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          this.animationItems$.next([...arr]); // Create a new array to trigger change detection
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
      value: Math.floor(Math.random() * 500),
      color: 'white',
    });
  }
  return arr;
}
