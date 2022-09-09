import { Directive } from '@angular/core';

@Directive({
  selector: '[azarcPage],azarc-page',
  host: {
    class: 'azarc-page',
  },
})
export class PageDirective {
  constructor() {}
}
