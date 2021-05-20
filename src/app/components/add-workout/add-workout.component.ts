import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Observable, Subscription } from "rxjs";
import { debounceTime, map, startWith } from "rxjs/operators";
import { Exercise } from "src/app/interfaces/exercise";
import { WorkoutFaze } from "src/app/interfaces/workouts";
import { FetchDataService } from "src/app/services/fetch-data.service";

@Component({
	selector: "app-add-workout",
	templateUrl: "./add-workout.component.html",
	styleUrls: ["./add-workout.component.scss"],
})
export class AddWorkoutComponent implements OnInit, OnDestroy {
	workoutTypeFormGroup: FormGroup;
	workoutFormGroup: FormGroup;
	exerciseFormGroup: FormGroup;

	currentId: string;
	filteredFazes: Observable<WorkoutFaze[]>;
	fazesWithExercisesSub: Subscription;
	exercisesSub: Subscription;
	filteredExercises: Observable<Exercise[]>;

	constructor(
		private formBuilder: FormBuilder,
		private fetchDataService: FetchDataService,
		public dialogRef: MatDialogRef<AddWorkoutComponent>,
		@Inject(MAT_DIALOG_DATA) public dialogData: { currentPage: string; currentId: string }
	) {}

	ngOnInit(): void {
		this.workoutTypeFormGroup = this.formBuilder.group({
			workoutTypeName: ["", Validators.required],
		});
		this.workoutFormGroup = this.formBuilder.group({
			workoutName: ["", Validators.required],
		});
		this.exerciseFormGroup = this.formBuilder.group({
			faze: ["", Validators.required],
			fazeReps: [""],
			exercise: ["", Validators.required],
			exerciseReps: [""],
			exerciseVideoUrl: [""],
		});

		if (this.dialogData.currentPage === "exercises") {
			this.fazesWithExercisesSub = this.fetchDataService
				.getWorkoutFazeByWorkoutId(this.dialogData.currentId)
				.subscribe((fazes: WorkoutFaze[]) => {
					this.filteredFazes = this.exerciseFormGroup.get("faze").valueChanges.pipe(
						debounceTime(400),
						startWith(""),
						map(value => (typeof value === "string" ? value : value.name)),
						map(name => (name ? this.filter(name, fazes) : fazes))
					);
				});

			this.exercisesSub = this.fetchDataService.getExercises().subscribe((exercises: Exercise[]) => {
				this.filteredExercises = this.exerciseFormGroup.get("exercise").valueChanges.pipe(
					debounceTime(400),
					startWith(""),
					map(value => (typeof value === "string" ? value : value.name)),
					map(name => (name ? this.filter(name, exercises) : exercises))
				);
			});
		}
	}

	private filter(value: string, options: Array<any>): any[] {
		const filterValue = value.toLowerCase();

		return options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
	}

	ngOnDestroy(): void {
		this.fazesWithExercisesSub?.unsubscribe();
		this.exercisesSub?.unsubscribe();
	}

	onSave(): void {
		switch (this.dialogData.currentPage) {
			case "workout-types":
				this.fetchDataService.addWorkoutType(this.workoutTypeFormGroup.value.workoutTypeName);
				break;
			case "workouts":
				this.fetchDataService.addWorkout({
					workoutName: this.workoutFormGroup.value.workoutName,
					workoutTypeId: this.dialogData.currentId,
				});
				break;
			case "exercises":
				this.fetchDataService.addExercise({ ...this.exerciseFormGroup.value, workoutId: this.dialogData.currentId });
				break;
		}

		this.dialogRef.close();
	}

	displayAs(option: WorkoutFaze | Exercise): string {
		return option ? option.name : "";
	}
}
