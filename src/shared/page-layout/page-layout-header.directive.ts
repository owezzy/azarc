import { Directive } from '@angular/core';

@Directive({
  selector: '[azarcPageLayoutHeader],azarc-page-layout-header',
  host: {
    class: 'azarc-page-layout-header',
  },
})
export class PageLayoutHeaderDirective {
  constructor() {}
}
