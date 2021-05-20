import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { MatStepperModule } from "@angular/material/stepper";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { YouTubePlayerModule } from "@angular/youtube-player";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { AppComponent } from "./app.component";
import { WorkoutTypeComponent } from "./components/workout-type/workout-type.component";
import { environment } from "src/environments/environment";
import { routes } from "./routes/routes";
import { WorkoutListComponent } from "./components/workout-list/workout-list.component";
import { ListComponent } from "./components/list/list.component";
import { HeaderComponent } from "./components/header/header.component";
import { ExerciseListComponent } from "./components/exercise-list/exercise-list.component";
import { ExerciseDetailsComponent } from "./components/exercise-details/exercise-details.component";
import { SanitizeUrlPipe } from "./pipes/sanitize-url.pipe";
import { LoginComponent } from "./components/login/login.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { CounterButtonComponent } from "./components/counter-button/counter-button.component";
import { AddWorkoutComponent } from "./components/add-workout/add-workout.component";

@NgModule({
	declarations: [
		AppComponent,
		WorkoutTypeComponent,
		WorkoutListComponent,
		ListComponent,
		HeaderComponent,
		ExerciseListComponent,
		ExerciseDetailsComponent,
		SanitizeUrlPipe,
		LoginComponent,
		SpinnerComponent,
		CounterButtonComponent,
		AddWorkoutComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,

		MatButtonModule,
		MatDialogModule,
		MatIconModule,
		MatToolbarModule,
		MatMenuModule,
		MatFormFieldModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatStepperModule,
		MatAutocompleteModule,

		RouterModule.forRoot(routes),
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFireDatabaseModule,
		YouTubePlayerModule,
	],
	providers: [
		{
			provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
			useValue: { duration: 2500 },
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
