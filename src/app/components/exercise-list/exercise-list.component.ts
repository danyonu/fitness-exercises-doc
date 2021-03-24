import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Exercises } from 'src/app/interfaces/exercises';
import { Workouts } from 'src/app/interfaces/workouts';
import { FetchDataService } from 'src/app/services/fetch-data.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {
  title: string;
  nextPath = '';
  exercises: Exercises[];
  // exercises = [{id:'1'}, {id:'2'}, {id:'3'}, {id:'4'}];
  currentId: string;
  workoutFazes;
  fazesWithExercises;
  fazesAndExercises

  constructor(private route: ActivatedRoute, private fetchDataService: FetchDataService) { }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('id');

    combineLatest([this.fetchDataService.getExercises(), this.fetchDataService.getWorkoutFazeForId(this.currentId)]).pipe(
      map(arr => arr),
      tap(console.log)
    ).subscribe();
    
    this.fetchDataService.getExercises().subscribe(item => this.exercises = item);

    // this.fetchDataService.getWorkoutForId(this.currentId).subscribe(item => {
    //   this.title = item.name;
      
    //   this.fazesWithExercises = item.workoutFaze.map((faze) => {
    //     let exercisesArr;

    //     exercisesArr = faze.exerciseIds.map((exId, i, arr) => {
    //       return this.exercises.filter(ex => ex.id == exId)[0];
    //     });

    //     return { 
    //       name: faze.name,
    //       reps: faze.reps,
    //       exercises: exercisesArr
    //     }
    //   });

    //   // console.log(this.fazesWithExercises);
    // });
  }

  filterExerciseForFaze(exercisesArr) {
    
    console.log(exercisesArr);
    let arr1 = [1,2,3,4,5,6];
    let arr2 = [1,2,3];
  }
}
