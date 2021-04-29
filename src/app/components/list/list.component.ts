import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { WorkoutType } from "src/app/interfaces/workout-type";
import { Workout } from "src/app/interfaces/workouts";

@Component({
	selector: "app-list",
	templateUrl: "./list.component.html",
	styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
	@Input() path: string;
	@Input() list: Observable<WorkoutType[] | Workout[]>;
	@Input() itemsCountPropName: string;
	@Input() completedItemsCount: string;
	@Input() showDetails = false;
	@Input() showDoneIcon = false;

	constructor() {}

	ngOnInit(): void {}
}
