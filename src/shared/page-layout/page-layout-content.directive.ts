import { Directive } from '@angular/core';

@Directive({
  selector: '[appAzarcPageLayoutContent],azarc-page-layout-content',
  host: {
    class: 'azarc-page-layout-content',
  },
})
export class PageLayoutContentDirective {
  constructor() {}
}
