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
        component: WorkoutTypeComponent,
        data: { animation: 'WorkoutTypePage' }
    },
    {
        path: 'workouts/:id',
        component: WorkoutListComponent,
        data: { animation: 'WorkoutsPage' }
    },
    {
        path: 'exercises/:id',
        component: ExerciseListComponent,
        data: { animation: 'ExercisesPage' }
    },
    {
        path: '**',
        component: WorkoutTypeComponent
    }
]