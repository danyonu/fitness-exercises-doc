import { Routes } from "@angular/router";
import { ExerciseListComponent } from "../components/exercise-list/exercise-list.component";
import { WorkoutListComponent } from "../components/workout-list/workout-list.component";
import { WorkoutTypeComponent } from "../components/workout-type/workout-type.component";

export const routes: Routes = [
    {
        path: '', 
        redirectTo: 'workout-type', 
        pathMatch: 'full'
    },
    {
        path: 'workout-type',
        component: WorkoutTypeComponent
    },
    {
        path: 'workouts/:id',
        component: WorkoutListComponent
    },
    {
        path: 'exercises/:id',
        component: ExerciseListComponent
    },
    {
        path: '**',
        component: WorkoutTypeComponent
    }
]