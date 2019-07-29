import {
  Component, NgZone, DoCheck 
} from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'zonejs',
  template: `
    <h2>Demo: ZoneJS </h2>
    <button (click)="runTask()">runTask</button>
  `,
})
export class ZoneJSDemo implements DoCheck {
  ngDoCheck() {
    console.log("ngDoCheck :");
  }

  runTask() {
    console.log('script start');

    setTimeout(function () {
      console.log('setTimeout');
    }, 0);

    Promise.resolve().then(function () {
      console.log('promise1');
    });

    console.log('script end');

    Promise.resolve().then(function () {
      console.log('promise 2');
    });
  }

}