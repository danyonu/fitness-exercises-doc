import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { combineLatest, Observable } from 'rxjs';
import { WorkoutFaze, WorkoutFazeWithExercises, Workouts } from '../interfaces/workouts';
import { Exercise } from '../interfaces/exercise';
import { WorkoutType } from '../interfaces/workout-type';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  constructor(private db: AngularFireDatabase) { }

  getWorkoutTypes(): Observable<WorkoutType[]> {
    return this.db.list<WorkoutType>('workoutType').valueChanges();
  }

  getWorkoutTypeById(id: string): Observable<WorkoutType> {
    return this.db.list<WorkoutType>('workoutType').valueChanges().pipe(
      map(array => array.filter(item => item.id === id)),
      map(item => item[0])
    );
  }

  getWorkouts(): Observable<Workouts[]> {
    return this.db.list<Workouts>('workouts').valueChanges();
  }

  getWorkoutById(id: string): Observable<Workouts> {
    return this.db.list<Workouts>('workouts').valueChanges().pipe(
      map(array => array.filter(item => item.id === id)[0])
    );
  }

  getWorkoutFazeByWorkoutId(id: string): Observable<WorkoutFaze[]> {
    return this.db.list<Workouts>('workouts').valueChanges().pipe(
      map(array => array.filter(item => item.id === id)[0].workoutFaze)
    );
  }

  getExercises(): Observable<Exercise[]> {
    return this.db.list<Exercise>('exercises').valueChanges();
  }

  getExerciseById(id: string): Observable<Exercise> {
    return this.db.list<Exercise>('exercises').valueChanges().pipe(
      map(array => array.filter(item => item.id === id)[0]),
      tap(console.log)
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
            exercises: exercises.filter(ex => ex.workoutFazeIds.includes(faze.id))
          }
        });
      }),
      tap(console.log)
    );
  }

  temp() {
    this.db.object<Workouts>('workouts').valueChanges().subscribe(console.log);
  this.db.list<Workouts>('workouts').stateChanges().subscribe(console.log);
  this.db.list<Workouts>('workouts').query.get().then(console.log)
  }
}
