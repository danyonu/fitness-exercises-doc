import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { LoginComponent } from "../login/login.component";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/interfaces/user";
import { Subscription } from "rxjs";
import { LoginService } from "src/app/services/login.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
	@Input() title: string;
	@Input() showMenu = false;
	@Input() showBackBtn = false;

	currentUser: User;
	currentUserSub: Subscription;

	constructor(
		private location: Location,
		private dialog: MatDialog,
		private userService: UserService,
		private loginService: LoginService
	) {}

	ngOnInit(): void {
		this.currentUserSub = this.userService.getCurrentUser().subscribe(user => (this.currentUser = user));
	}

	ngOnDestroy(): void {
		this.currentUserSub.unsubscribe();
	}

	goBack() {
		this.location.back();
	}

	login() {
		const dialogRef = this.dialog.open(LoginComponent, {
			data: { name: "this is the name" },
			width: "95%",
			maxWidth: "600px",
		});
	}

	logout() {
		this.loginService.logout();
	}

	addWorkout() {}
}
