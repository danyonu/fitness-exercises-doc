import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FetchDataService } from "./fetch-data.service";
import { UserService } from "./user.service";

@Injectable({
	providedIn: "root",
})
export class LoginService {
	constructor(
		private fetchDataService: FetchDataService,
		private userService: UserService,
		private snackbar: MatSnackBar
	) {
		const username = this.getLoggedInUser();

		if (username) {
			this.login(username);
		}
	}

	login(username: string) {
		this.fetchDataService.getUserById(username).subscribe(
			data => {
				const loggedInUser = this.getLoggedInUser();

				if (!loggedInUser || loggedInUser !== username) {
					localStorage.setItem("username", username);
					this.snackbar.open(`Welcome ${data.name}!`, "", {
						panelClass: "custom-snackbar-success",
					});
				}

				this.userService.setUser(data);
			},
			(error: string) => {
				this.snackbar.open(error, "", {
					panelClass: "custom-snackbar-error",
				});
			}
		);
	}

	logout() {
		localStorage.removeItem("username");
		this.userService.setUser(null);
	}

	isLoggedIn(username: string): string {
		return localStorage.getItem(username);
	}

	getLoggedInUser(): string {
		return localStorage.getItem("username");
	}
}
