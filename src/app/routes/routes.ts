import { Routes } from "@angular/router";
import { ExerciseListComponent } from "../components/exercise-list/exercise-list.component";
import { WorkoutListComponent } from "../components/workout-list/workout-list.component";
import { WorkoutTypeComponent } from "../components/workout-type/workout-type.component";

export const routes: Routes = [
	{
		path: "",
		redirectTo: "workout-types",
		pathMatch: "full",
		data: { animation: "WorkoutsPage" },
	},
	{
		path: "workout-types",
		component: WorkoutTypeComponent,
		data: { animation: "WorkoutTypesPage" },
	},
	{
		path: "workouts/:id",
		component: WorkoutListComponent,
		data: { animation: "WorkoutsPage" },
	},
	{
		path: "exercises/:id",
		component: ExerciseListComponent,
		data: { animation: "ExercisesPage" },
	},
	{
		path: "**",
		component: WorkoutTypeComponent,
		data: { animation: "WorkoutsPage" },
	},
];
