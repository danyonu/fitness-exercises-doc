import { Exercise } from "./exercise";

export interface Workout {
	id: string;
	name: string;
	workoutFaze: WorkoutFaze[];
	workoutTypeId: string;
}

export interface WorkoutFaze {
	id: string;
	name: string;
	reps: number;
	workoutId: string;
	exerciseIds: string[];
}

export interface WorkoutFazeWithExercises {
	id: string;
	name: string;
	reps: number;
	exercises: Exercise[];
}
