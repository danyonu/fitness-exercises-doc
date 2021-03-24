import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { WorkoutFaze, Workouts } from '../interfaces/workouts';
import { Exercises } from '../interfaces/exercises';
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

  getWorkoutTypeForId(id: string): Observable<WorkoutType> {
    return this.db.list<WorkoutType>('workoutType').valueChanges().pipe(
      map(array => array.filter(item => item.id === id)),
      map(item => item[0])
    );
  }

  getWorkouts(): Observable<Workouts[]> {
    return this.db.list<Workouts>('workouts').valueChanges();
  }

  getWorkoutForId(id: string): Observable<Workouts> {
    return this.db.list<Workouts>('workouts').valueChanges().pipe(
      map(array => array.filter(item => item.id === id)),
      map(item => item[0])
    );
  }

  getWorkoutFazeForId(id: string): Observable<WorkoutFaze[]> {
    return this.db.list<Workouts>('workouts').valueChanges().pipe(
      map(array => array.filter(item => item.id === id)),
      map(item => item[0].workoutFaze)
    );
  }

  getExercises(): Observable<Exercises[]> {
    return this.db.list<Exercises>('exercises').valueChanges();
  }

  temp() {
    this.db.object<Workouts>('workouts').valueChanges().subscribe(console.log);
  this.db.list<Workouts>('workouts').stateChanges().subscribe(console.log);
  this.db.list<Workouts>('workouts').query.get().then(console.log)
  }
}
