import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise } from 'src/app/interfaces/exercise';
import { WorkoutFazeWithExercises } from 'src/app/interfaces/workouts';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { ExerciseDetailsComponent } from '../exercise-details/exercise-details.component';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {
  title: Observable<string>;
  nextPath = '';
  currentId: string;
  fazesWithExercises: Observable<WorkoutFazeWithExercises[]>;

  constructor(
    private route: ActivatedRoute, 
    private fetchDataService: FetchDataService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('id');
    this.fazesWithExercises = this.fetchDataService.getWorkoutFazesWithExercises(this.currentId);

    this.title = this.fetchDataService.getWorkoutById(this.currentId).pipe(
      map(workout => workout.name)
    );
  }

  openDialog(exercise: Exercise) {
    console.log(exercise);
    this.dialog.open(
      ExerciseDetailsComponent, 
      {
        data:  exercise, 
        width: '95%', 
        maxWidth: '650px',
        panelClass: 'custom-dialog-container'
      }
    );
  }
}
