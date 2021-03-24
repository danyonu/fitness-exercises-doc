import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { Workouts } from 'src/app/interfaces/workouts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListComponent implements OnInit, OnDestroy {
  workouts$: Observable<Workouts[]>;

  title: string;
  nextPath = '/exercises'
  currentId: string;
  currentWorkoutType;

  constructor(private fetchDataService: FetchDataService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('id');
    this.workouts$ = this.fetchDataService.getWorkouts().pipe(
      map(item => item.filter(item => item.workoutTypeId === this.currentId)),
      tap(console.log)
    );

    this.currentWorkoutType = this.fetchDataService.getWorkoutTypeForId(this.currentId)
      .subscribe(item => {
        this.title = item.name;
    });
  }

  ngOnDestroy(): void {
      this.currentWorkoutType.unsubscribe();
  }
}
