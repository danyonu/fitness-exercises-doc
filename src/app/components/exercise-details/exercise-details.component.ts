import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Exercise } from "src/app/interfaces/exercise";

@Component({
	selector: "app-exercise-details",
	templateUrl: "./exercise-details.component.html",
	styleUrls: ["./exercise-details.component.scss"],
})
export class ExerciseDetailsComponent implements OnInit {
	constructor(@Inject(MAT_DIALOG_DATA) public exercise: Exercise) {}

	ngOnInit(): void {}
}
