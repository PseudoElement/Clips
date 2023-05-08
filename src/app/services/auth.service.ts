import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { UserRegisterData } from "../shared/types";
import { Observable, delay, map, filter, switchMap, of } from "rxjs";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private usersCollection: AngularFirestoreCollection<UserRegisterData>;
    public isAuthenticated$: Observable<boolean>;
    public isAuthenticatedWithDelay$: Observable<boolean>;
    public isShouldRedurect = false;

    constructor(private activeRoute: ActivatedRoute, private router: Router, private db: AngularFirestore, private auth: AngularFireAuth) {
        this.usersCollection = db.collection("users");
        this.isAuthenticated$ = auth.user.pipe(map((user) => !!user));
        this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(delay(4000));
        this.router.events
            .pipe(
                filter((e) => e instanceof NavigationEnd),
                map((e) => this.activeRoute.firstChild),
                switchMap((route) => route?.data ?? of({ authOnly: false }))
            )
            .subscribe((data) => {
                this.isShouldRedurect = data.authOnly ?? false;
            });
    }

    public async createUser(userData: UserRegisterData) {
        const credentials = await this.auth.createUserWithEmailAndPassword(userData.email, userData.password!);
        await this.usersCollection.doc(credentials.user?.uid).set({
            email: userData.email,
            age: userData.age,
            name: userData.name,
            phone: userData.phone,
        });

        await credentials.user?.updateProfile({
            displayName: userData.name,
        });
    }
    public async signIn(email: string, password: string) {
        await this.auth.signInWithEmailAndPassword(email, password);
    }
    public async signOut() {
        await this.auth.signOut();
        if (this.isShouldRedurect) {
            await this.router.navigateByUrl("/");
        }
    }
}
