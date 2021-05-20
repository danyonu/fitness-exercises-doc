import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { LoginComponent } from "../login/login.component";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/interfaces/user";
import { Subscription } from "rxjs";
import { LoginService } from "src/app/services/login.service";
import { AddWorkoutComponent } from "../add-workout/add-workout.component";
import { ActivatedRoute } from "@angular/router";

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
	currentPage: string;
	currentId: string;

	constructor(
		private location: Location,
		private dialog: MatDialog,
		private userService: UserService,
		private loginService: LoginService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.currentUserSub = this.userService.getCurrentUser().subscribe(user => (this.currentUser = user));
		this.currentPage = this.route.snapshot.url[0].path;
		this.currentId = this.route.snapshot.paramMap.get("id");
	}

	ngOnDestroy(): void {
		this.currentUserSub.unsubscribe();
	}

	goBack() {
		this.location.back();
	}

	login() {
		this.dialog.open(LoginComponent, {
			width: "95%",
			maxWidth: "600px",
		});
	}

	logout() {
		this.loginService.logout();
	}

	addWorkout() {
		this.dialog.open(AddWorkoutComponent, {
			data: { currentPage: this.currentPage, currentId: this.currentId },
			width: "95%",
			maxWidth: "600px",
			autoFocus: false,
		});
	}
}
