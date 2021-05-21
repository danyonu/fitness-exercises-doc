import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { combineLatest, Observable, of, throwError } from "rxjs";
import { WorkoutFaze, WorkoutFazeWithExercises, Workout } from "../interfaces/workouts";
import { Exercise, ExerciseToAdd } from "../interfaces/exercise";
import { WorkoutType } from "../interfaces/workout-type";
import { map, mergeMap, take } from "rxjs/operators";
import { User } from "../interfaces/user";
import { UserService } from "./user.service";

@Injectable({
	providedIn: "root",
})
export class FetchDataService {
	userData: User;
	constructor(private db: AngularFireDatabase, private userService: UserService) {}

	// workout types
	getWorkoutTypes(): Observable<WorkoutType[]> {
		return this.db
			.list<WorkoutType>("workoutType")
			.snapshotChanges()
			.pipe(
				map(arr => {
					return arr.map(item => {
						return {
							...item.payload.toJSON(),
							id: item.key,
						} as WorkoutType;
					});
				})
			);
	}

	getWorkoutTypeById(id: string): Observable<WorkoutType> {
		return this.db
			.object<WorkoutType>(`workoutType/${id}`)
			.snapshotChanges()
			.pipe(
				map(obj => {
					return {
						...obj.payload.toJSON(),
						id: obj.key,
					} as WorkoutType;
				})
			);
	}

	getWorkoutTypeWorkoutCountById(id: string): Observable<number> {
		return this.db
			.object<WorkoutType>(`workoutType/${id}`)
			.valueChanges()
			.pipe(
				map(obj => {
					return obj.workoutCount;
				})
			);
	}

	// workouts
	getWorkouts(): Observable<Workout[]> {
		return this.db
			.list<WorkoutType>("workouts")
			.snapshotChanges()
			.pipe(
				map(arr => {
					return arr
						.map(item => {
							return {
								...item.payload.toJSON(),
								id: item.key,
							} as Workout;
						})
						.sort((a: Workout, b: Workout) => {
							return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" });
						});
				})
			);
	}

	getWorkoutById(id: string): Observable<Workout> {
		return this.db
			.object<WorkoutType>(`workouts/${id}`)
			.snapshotChanges()
			.pipe(
				map(obj => {
					return {
						...obj.payload.toJSON(),
						id: obj.key,
					} as Workout;
				})
			);
	}

	getWorkoutFazeByWorkoutId(id: string): Observable<WorkoutFaze[]> {
		return this.db
			.list<WorkoutFaze>(`workouts/${id}/workoutFaze`)
			.snapshotChanges()
			.pipe(
				map(arr => {
					return arr
						.map(item => {
							const exerciseIds = item.payload.toJSON() as WorkoutFaze;

							return {
								...item.payload.toJSON(),
								id: item.key,
								workoutId: id,
								exerciseIds: Object.values(exerciseIds.exerciseIds),
							} as WorkoutFaze;
						})
						.sort((a: WorkoutFaze, b: WorkoutFaze) => {
							return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" });
						});
				})
			);
	}

	// exercises
	getExercises(): Observable<Exercise[]> {
		return this.db
			.list<Exercise>("exercises")
			.snapshotChanges()
			.pipe(
				map(arr => {
					return arr.map(item => {
						const exercise = item.payload.toJSON() as Exercise;

						return {
							...exercise,
							videoId: Object.values(exercise.videoId),
							workoutFazeIds: Object.values(exercise.workoutFazeIds),
							id: item.key,
						} as Exercise;
					});
				})
			);
	}

	getExerciseById(id: string): Observable<Exercise> {
		return this.db
			.object<Exercise>(`exercises/${id}`)
			.snapshotChanges()
			.pipe(
				map(obj => {
					return {
						...obj.payload.toJSON(),
						id: obj.key,
					} as Exercise;
				})
			);
	}

	getWorkoutFazesWithExercises(id: string): Observable<WorkoutFazeWithExercises[]> {
		return combineLatest([this.getExercises(), this.getWorkoutFazeByWorkoutId(id)]).pipe(
			map(arr => {
				let exercises: Exercise[] = arr[0] || [];
				let workoutFaze: WorkoutFaze[] = arr[1] || [];

				return workoutFaze.map(faze => {
					return {
						id: faze.id,
						name: faze.name,
						reps: faze.reps,
						workoutId: faze.workoutId,
						exercises: exercises.filter(ex => ex.workoutFazeIds.includes(faze.id)),
					};
				});
			})
		);
	}

	// users
	getUserById(userId: string): Observable<User> {
		return this.db
			.object<User>(`users/${userId}`)
			.snapshotChanges()
			.pipe(
				mergeMap(obj => {
					if (!obj.key) {
						return throwError("User does no exist!");
					} else {
						const user = obj.payload.toJSON() as User;
						const workoutIdsArr = Object.keys(user.fazeCompletedInWorkout || {});
						const workoutTypeIdsArr = Object.keys(user.workoutCompletedInWorkoutType || {});
						const formattedFazeCompletedInWorkout = workoutIdsArr.reduce((obj, id) => {
							obj[id] = Object.values(user.fazeCompletedInWorkout[id]);
							return obj;
						}, {});
						const formattedWorkoutCompletedInWorkoutType = workoutTypeIdsArr.reduce((obj, id) => {
							obj[id] = Object.values(user.workoutCompletedInWorkoutType[id]);
							return obj;
						}, {});

						return of({
							...user,
							fazeCompletedInWorkout: formattedFazeCompletedInWorkout,
							workoutCompletedInWorkoutType: formattedWorkoutCompletedInWorkoutType,
							fazeCount: user.fazeCount || {},
							id: obj.key,
						} as User);
					}
				})
			);
	}

	// update
	updateUser(username: string, data) {
		this.db.object<User>(`users/${username}`).update(data);
	}

	updateWorkouts(workoutId: string, data) {
		this.db.object<WorkoutType>(`workouts/${workoutId}`).update(data);
	}

	updateWorkoutType(workoutTypeId: string, data) {
		this.db.object<WorkoutType>(`workoutType/${workoutTypeId}`).update(data);
	}

	updateRepsCount(userId: string, fazeId: string, count: number) {
		this.db.object<number>(`users/${userId}/fazeCount/${fazeId}`).set(count);
	}

	//add
	addWorkoutType(newWorkoutType: string) {
		let newId = this.db.createPushId();
		let objToSave = {
			name: newWorkoutType,
			workoutCount: 0,
		};

		this.db.object(`workoutType/${newId}`).set(objToSave);
	}

	addWorkout({ workoutName, workoutTypeId }) {
		let newId = this.db.createPushId();
		let objToSave = {
			name: workoutName,
			workoutFaze: [],
			workoutTypeId: workoutTypeId,
		};

		this.db.object(`workouts/${newId}`).set(objToSave);

		this.getWorkoutTypeWorkoutCountById(workoutTypeId)
			.pipe(take(1))
			.subscribe(currentWorkoutCount => {
				this.db.object(`workoutType/${workoutTypeId}`).update({ workoutCount: ++currentWorkoutCount });
			});
	}

	addExercise(data: ExerciseToAdd) {
		let newFazeId = this.db.createPushId();
		let newExerciseId = this.db.createPushId();
		let isFazeAddNew = typeof data.faze === "string";
		let isExerciseAddNew = typeof data.exercise === "string";

		if (isFazeAddNew && isExerciseAddNew) {
			this.addNewFaze(data, newExerciseId, newFazeId);
			this.addNewExercise(data, newFazeId, newExerciseId);
		} else if (isFazeAddNew && !isExerciseAddNew) {
			this.addNewFaze(data, (<Exercise>data.exercise).id, newFazeId);
			this.updateWorkFazeIdsOnExercise(data, newFazeId);
		} else if (!isFazeAddNew && isExerciseAddNew) {
			this.addNewExercise(data, (<WorkoutFaze>data.faze).id, newExerciseId);
			this.updateExerciseIdsOnWorkoutFaze(data, newExerciseId);
		} else if (!isFazeAddNew && !isExerciseAddNew) {
			this.updateExerciseIdsOnWorkoutFaze(data, (<Exercise>data.exercise).id);
			this.updateWorkFazeIdsOnExercise(data, (<WorkoutFaze>data.faze).id);
		}
	}

	private addNewExercise(data: ExerciseToAdd, newFazeId: string, newExerciseId: string) {
		let exerciseToSave = {
			name: data.exercise,
			reps: data.exerciseReps,
			videoId: [this.getYouTubeIdFromUrl(data.exerciseVideoUrl)],
			workoutFazeIds: [newFazeId],
		};

		this.db.object(`exercises/${newExerciseId}`).set(exerciseToSave);
	}

	private addNewFaze(data: ExerciseToAdd, newExerciseId: string, newFazeId: string) {
		let fazeToSave = {
			name: data.faze,
			reps: data.fazeReps,
			exerciseIds: [newExerciseId],
		};

		this.db.object(`workouts/${data.workoutId}/workoutFaze/${newFazeId}`).set(fazeToSave);
	}

	private updateWorkFazeIdsOnExercise(data: ExerciseToAdd, fazeId: string) {
		let exerciseId = (<Exercise>data.exercise).id;
		let exerciseWorkoutFazeIds = (<Exercise>data.exercise).workoutFazeIds;

		if (exerciseWorkoutFazeIds.indexOf(fazeId) === -1) {
			this.db.object(`exercises/${exerciseId}/workoutFazeIds`).update([...exerciseWorkoutFazeIds, fazeId]);
		}
	}

	private updateExerciseIdsOnWorkoutFaze(data: ExerciseToAdd, exerciseId: string) {
		let workoutFazeExerciseIds = (<WorkoutFaze>data.faze).exerciseIds;
		let workoutFazeId = (<WorkoutFaze>data.faze).id;

		if (workoutFazeExerciseIds.indexOf(exerciseId) === -1) {
			this.db
				.object(`workouts/${data.workoutId}/workoutFaze/${workoutFazeId}/exerciseIds`)
				.update([...workoutFazeExerciseIds, exerciseId]);
		}
	}

	private getYouTubeIdFromUrl(url: string): string {
		let videoId = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);

		return videoId ? videoId[1] : "";
	}
}
