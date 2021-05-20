import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Exercise } from "src/app/interfaces/exercise";
import { User } from "src/app/interfaces/user";
import { Workout, WorkoutFaze, WorkoutFazeWithExercises } from "src/app/interfaces/workouts";
import { FetchDataService } from "src/app/services/fetch-data.service";
import { UserService } from "src/app/services/user.service";
import { ExerciseDetailsComponent } from "../exercise-details/exercise-details.component";

@Component({
	selector: "app-exercise-list",
	templateUrl: "./exercise-list.component.html",
	styleUrls: ["./exercise-list.component.scss"],
})
export class ExerciseListComponent implements OnInit, OnDestroy {
	title: Observable<string>;
	currentId: string;
	fazesWithExercises: Observable<WorkoutFazeWithExercises[]>;
	currentUser: User;
	currentUserSub: Subscription;
	workoutSub: Subscription;
	currentWorkoutData: Workout;

	constructor(
		public dialog: MatDialog,
		private route: ActivatedRoute,
		private fetchDataService: FetchDataService,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.currentId = this.route.snapshot.paramMap.get("id");
		this.fazesWithExercises = this.fetchDataService.getWorkoutFazesWithExercises(this.currentId);

		this.title = this.fetchDataService.getWorkoutById(this.currentId).pipe(map(workout => workout.name));

		this.currentUserSub = this.userService.getCurrentUser().subscribe(user => (this.currentUser = user));
		this.workoutSub = this.fetchDataService
			.getWorkoutById(this.currentId)
			.subscribe(workout => (this.currentWorkoutData = workout));
	}

	ngOnDestroy(): void {
		this.currentUserSub.unsubscribe();
		this.workoutSub.unsubscribe();
	}

	private toggleCompleteStatusInUser(objProp: string, itemId: string, groupId: string) {
		if (!Object.keys(this.currentUser[objProp][groupId] || {}).length) {
			this.currentUser[objProp][groupId] = [];
		}

		if (this.currentUser[objProp][groupId].includes(itemId)) {
			this.currentUser[objProp][groupId].splice(this.currentUser[objProp][groupId].indexOf(itemId), 1);
		} else {
			this.currentUser[objProp][groupId].push(itemId);
		}
	}

	private updateWorkoutsCompleteState(faze: WorkoutFaze) {
		this.toggleCompleteStatusInUser("fazeCompletedInWorkout", faze.id, faze.workoutId);

		if (
			Object.keys(this.currentWorkoutData.workoutFaze).length ==
			this.currentUser.fazeCompletedInWorkout[faze.workoutId]?.length
		) {
			this.toggleCompleteStatusInUser(
				"workoutCompletedInWorkoutType",
				faze.workoutId,
				this.currentWorkoutData.workoutTypeId
			);
		}

		this.fetchDataService.updateUser(this.currentUser.id, {
			fazeCompletedInWorkout: this.currentUser.fazeCompletedInWorkout,
			workoutCompletedInWorkoutType: this.currentUser.workoutCompletedInWorkoutType,
		});
	}

	openDialog(exercise: Exercise) {
		this.dialog.open(ExerciseDetailsComponent, {
			data: exercise,
			width: "95%",
			maxWidth: "650px",
			panelClass: "custom-dialog-container",
		});
	}

	onFazeCount(faze: WorkoutFaze) {
		let userFazeCount = this.currentUser.fazeCount[faze.id] || 0;

		if (faze.reps < userFazeCount + 1) {
			return;
		}

		if (faze.reps == ++userFazeCount) {
			this.updateWorkoutsCompleteState(faze);
		}

		this.fetchDataService.updateRepsCount(this.currentUser.id, faze.id, userFazeCount);
	}
}
