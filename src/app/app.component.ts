import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations/slide-in';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class AppComponent {
  
  prepareRoute(outlet: RouterOutlet) {
    const a = outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    console.log(a);
    return a
  }
}
