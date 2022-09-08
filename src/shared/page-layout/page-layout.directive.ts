import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[azarcPageLayout],azarc-page-layout',
  host: {
    class: 'azarc-page-layout',
  },
})
export class PageLayoutDirective {
  @Input() mode: 'card' | 'simple' = 'simple';

  constructor() {}

  @HostBinding('class.azarc-page-layout-card')
  get isCard() {
    return this.mode === 'card';
  }

  @HostBinding('class.azarc-page-layout-simple')
  get isSimple() {
    return this.mode === 'simple';
  }
}
