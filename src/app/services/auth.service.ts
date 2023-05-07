import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { UserRegisterData } from "../shared/types";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private usersCollection: AngularFirestoreCollection<UserRegisterData>;
    public isAuthenticated$: Observable<boolean>;

    constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
        this.usersCollection = db.collection("users");
        this.isAuthenticated$ = auth.user.pipe(map((user) => !!user));
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
}
