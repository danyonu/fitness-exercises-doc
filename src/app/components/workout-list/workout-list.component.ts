import { Component, OnDestroy, OnInit } from "@angular/core";
import { map, mergeMap, tap } from "rxjs/operators";
import { combineLatest, merge, Observable, Subscription } from "rxjs";
import { FetchDataService } from "src/app/services/fetch-data.service";
import { Workout } from "src/app/interfaces/workouts";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/interfaces/user";

@Component({
	selector: "app-workout-list",
	templateUrl: "./workout-list.component.html",
	styleUrls: ["./workout-list.component.scss"],
})
export class WorkoutListComponent implements OnInit, OnDestroy {
	workouts$: Observable<Workout[]>;
	title: string;
	nextPath = "/exercises";
	currentId: string;
	currentWorkoutTypeSub: Subscription;

	constructor(
		private fetchDataService: FetchDataService,
		private route: ActivatedRoute,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.currentId = this.route.snapshot.paramMap.get("id");
		this.currentWorkoutTypeSub = this.fetchDataService.getWorkoutTypeById(this.currentId).subscribe(item => {
			this.title = item.name;
		});

		this.workouts$ = combineLatest([this.fetchDataService.getWorkouts(), this.userService.getCurrentUser()]).pipe(
			map(([workout, user]) => {
				let workoutsForWorkoutType = workout.filter(item => item.workoutTypeId === this.currentId);

				return workoutsForWorkoutType.map(item => {
					let userFazeCompletedInWorkout = user?.fazeCompletedInWorkout;
					let userFazeCompleted: number;

					if (userFazeCompletedInWorkout && userFazeCompletedInWorkout[item.id]) {
						userFazeCompleted = userFazeCompletedInWorkout[item.id].length;
					} else {
						userFazeCompleted = 0;
					}

					return {
						...item,
						fazesCompleted: userFazeCompleted,
					};
				});
			}),
			tap(console.log)
		);
	}

	ngOnDestroy(): void {
		this.currentWorkoutTypeSub.unsubscribe();
	}
}
