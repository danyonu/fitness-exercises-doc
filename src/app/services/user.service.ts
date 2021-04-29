import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "../interfaces/user";

@Injectable({
	providedIn: "root",
})
export class UserService {
	private userSubject$: BehaviorSubject<User>;

	constructor() {
		this.userSubject$ = new BehaviorSubject<User>(null);
	}

	setUser(user: User) {
		this.userSubject$.next(user);
	}

	getCurrentUser(): Observable<User> {
		return this.userSubject$.asObservable();
	}
}
