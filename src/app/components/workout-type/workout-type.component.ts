import { Component, OnDestroy, OnInit } from "@angular/core";
import { combineLatest, Observable, Subscription } from "rxjs";
import { map, mergeMap, switchMap, tap } from "rxjs/operators";
import { User } from "src/app/interfaces/user";
import { WorkoutType } from "src/app/interfaces/workout-type";
import { Workout } from "src/app/interfaces/workouts";
import { FetchDataService } from "src/app/services/fetch-data.service";
import { UserService } from "src/app/services/user.service";

@Component({
	selector: "app-workout-type",
	templateUrl: "./workout-type.component.html",
	styleUrls: ["./workout-type.component.scss"],
})
export class WorkoutTypeComponent implements OnInit, OnDestroy {
	workoutType$: Observable<WorkoutType[]>;
	nextPath = "/workouts";
	title = "Workout Types";
	workoutsCompleted: Observable<number>;
	currentUser: User;
	currentUserSub: Subscription;

	constructor(private fetchDataService: FetchDataService, private userService: UserService) {}

	ngOnInit(): void {
		this.workoutType$ = combineLatest([
			this.fetchDataService.getWorkoutTypes(),
			this.userService.getCurrentUser(),
		]).pipe(
			map(([workoutTypes, user]) => {
				return workoutTypes.map(item => {
					let userWorkoutCompletedInWorkoutType = user?.workoutCompletedInWorkoutType;
					let userWorkoutsCompleted: number;

					if (userWorkoutCompletedInWorkoutType && userWorkoutCompletedInWorkoutType[item.id]) {
						userWorkoutsCompleted = userWorkoutCompletedInWorkoutType[item.id].length;
					} else {
						userWorkoutsCompleted = 0;
					}

					return {
						...item,
						workoutsCompleted: userWorkoutsCompleted,
					};
				});
			})
		);
		this.currentUserSub = this.userService.getCurrentUser().subscribe(user => (this.currentUser = user));
	}

	ngOnDestroy(): void {
		this.currentUserSub.unsubscribe();
	}
}
