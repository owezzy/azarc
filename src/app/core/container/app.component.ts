import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { routeAnimations } from 'src/shared/animations/route.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
})
export class AppComponent {
  constructor(public media: MediaObserver) {}
}
