import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkoutType } from 'src/app/interfaces/workout-type';
import { FetchDataService } from 'src/app/services/fetch-data.service';

@Component({
  selector: 'app-workout-type',
  templateUrl: './workout-type.component.html',
  styleUrls: ['./workout-type.component.scss']
})
export class WorkoutTypeComponent implements OnInit {
  workoutType$: Observable<WorkoutType[]>;
  nextPath = '/workouts';
  title = 'Workout Types';

  constructor(
    private fetchDataService: FetchDataService,
    ) { }

  ngOnInit(): void {
    this.workoutType$ = this.fetchDataService.getWorkoutTypes();
  }
}
