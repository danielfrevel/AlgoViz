import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject, generate } from 'rxjs';

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
  sortItems = generateRandomArray();

  bubbleSort() {
    const arr = this.sortItems;
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      arr[i].color = 'red';
      for (let j = 0; j < n - i - 1; j++) {
        setTimeout(() => {
          if (arr[j].value > arr[j + 1].value) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }, 100);
      }
      arr[i].color = 'white';
    }

    this.sortItems = arr;
  }

  randomize() {
    this.sortItems = generateRandomArray();
  }
}

function generateRandomArray(): SortItem[] {
  const arr = [];
  for (let i = 0; i < 300; i++) {
    arr.push({
      value: Math.floor(Math.random() * 1000),
      color: 'white',
    });
  }
  return arr;
}
