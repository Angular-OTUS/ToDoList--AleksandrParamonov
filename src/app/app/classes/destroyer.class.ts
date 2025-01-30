import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
	template: '',
})
export class DestroyerComponent implements OnDestroy {
   destroy$: Subject<boolean> = new Subject<boolean>();

   ngOnDestroy() {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
   }
}