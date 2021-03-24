import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material/button';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { WorkoutTypeComponent } from './components/workout-type/workout-type.component';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { routes } from './routes/routes';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { ListComponent } from './components/list/list.component';
import { HeaderComponent } from './components/header/header.component';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutTypeComponent,
    WorkoutListComponent,
    ListComponent,
    HeaderComponent,
    ExerciseListComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
