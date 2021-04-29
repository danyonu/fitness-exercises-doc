import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { slideInAnimation } from "./animations/slide-in";
import { LoginService } from "./services/login.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
	animations: [slideInAnimation],
})
export class AppComponent {
	// initialize login service here to login user automatically if in localStorage
	constructor(private loginService: LoginService) {}

	prepareRoute(outlet: RouterOutlet) {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
	}
}
