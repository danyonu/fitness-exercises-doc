import { Component, Input, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { User } from "src/app/interfaces/user";
import { WorkoutFaze } from "src/app/interfaces/workouts";
import { UserService } from "src/app/services/user.service";

@Component({
	selector: "app-counter-button",
	templateUrl: "./counter-button.component.html",
	styleUrls: ["./counter-button.component.scss"],
})
export class CounterButtonComponent implements OnInit {
	@Input() counter: number;
	@Input() complete: number;

	constructor() {}

	ngOnInit(): void {}
}
