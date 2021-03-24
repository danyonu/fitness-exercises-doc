export interface Workouts {
    id: string;
    name: string;
    workoutFaze: WorkoutFaze[];
    workoutTypeId: string;
}

export interface WorkoutFaze {
    exerciseIds: string[];
    name: string;
    reps: number
}
