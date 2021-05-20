import { WorkoutFaze } from "./workouts";

export interface Exercise {
	id: string;
	name: string;
	reps: string;
	imageUrl: string;
	videoId: string[];
	workoutFazeIds: string[];
}

export interface ExerciseToAdd {
	faze: string | WorkoutFaze;
	fazeReps: number;
	exercise: string | Exercise;
	exerciseReps: string;
	exerciseVideoUrl: string;
	workoutId: string;
}
