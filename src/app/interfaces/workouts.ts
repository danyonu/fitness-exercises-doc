import { Exercise } from "./exercise";

export interface Workouts {
    id: string;
    name: string;
    workoutFaze: WorkoutFaze[];
    workoutTypeId: string;
}

export interface WorkoutFaze {
    id: string;
    name: string;
    reps: number
    exerciseIds: string[];
}

export interface WorkoutFazeWithExercises {
    id: string;
    name: string;
    reps: number
    exercises: Exercise[];
}
