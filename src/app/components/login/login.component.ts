import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { LoginService } from "src/app/services/login.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	name = new FormControl("", [Validators.required]);

	constructor(
		public dialogRef: MatDialogRef<LoginComponent>,
		@Inject(MAT_DIALOG_DATA) public data: string,
		private loginService: LoginService
	) {}

	ngOnInit(): void {}

	onCancel() {
		this.dialogRef.close();
	}

	onLogin(name: string) {
		this.loginService.login(name);
		this.dialogRef.close();
	}
}
