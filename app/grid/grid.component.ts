import { Component, Input, ChangeDetectionStrategy , ChangeDetectorRef, OnInit, NgZone} from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, takeWhile, finalize } from 'rxjs/operators';
import * as _ from 'underscore';

interface GridElem{
  index:string;
  bgcolor:string;
}

@Component({
  selector: 'grid-elem',
  template: `<button style="width:100px; height: 100px;" [style.background]="bgcolor" (click)="toggle()">{{index}}</button> <p>{{ check() }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridElementComponent  {
  @Input() index: string;
  @Input() bgcolor: string;
  constructor(private cd:ChangeDetectorRef){}
  toggle(){
    ((this.bgcolor === "red")? this.bgcolor = "" : this.bgcolor = "red");
    //this.cd.detectChanges(); // Start with triggerred component and also trigger from the root.
    //this.cd.markForCheck(); // Trigger from the root view node on next Cd cycle.
  }
  check()
  {
      console.log("Grid-Element: ", this.index, " Checked..")
  }
}

@Component({
  selector: 'grid-list',
  template: `<div class="wrapper">  <grid-elem  *ngFor="let obj of ilist" [index]="obj.index" [bgcolor]="obj.bgcolor"> </grid-elem></div> <p>{{ check() }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridListComponent  {
  @Input() ilist: GridElem[];

  check()
  {
      console.log("Grid-List: Checked..")
  }
}

@Component({
  selector: 'grid',
  template: `<grid-list [ilist]=list></grid-list> <p>{{ check() }}</p> <p> {{ count$ | async }} </p>`
})
export class GridComponent implements OnInit  {
  list:GridElem[] = [{index:"1", bgcolor:""}, {index:"2", bgcolor:""}, {index:"3", bgcolor:""}];

  countDown = 10;
  countCompleted = false;
  count$: Observable<number>;
  constructor(private _ngZone:NgZone) {}
  check()
  {
      console.log("Grid-Component: Checked..")
  }

   ngOnInit() {
      console.log(_.isEqual([{index:"1", bgcolor:""}, {index:"2", bgcolor:""}, {index:"3", bgcolor:""}], [{index:"1", bgcolor:""}, {index:"4", bgcolor:""}, {index:"3", bgcolor:""}]));

this._ngZone.runOutsideAngular(() => {
      const timer = interval(1000);
      timer.pipe(
      map(i => this.countDown - i),
      takeWhile(i => i > 0),
      finalize(() => ( this._ngZone.run(() => {this.list = [{index:"4", bgcolor:""}, {index:"2", bgcolor:""}, {index:"6", bgcolor:""}]}))
    ));
    });   
  }
}
