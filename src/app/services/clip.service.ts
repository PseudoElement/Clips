import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from "@angular/fire/compat/firestore";
import { IClip } from "../shared/types";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { of, switchMap } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ClipService {
    public clipsCollection: AngularFirestoreCollection<IClip>;
    constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
        this.clipsCollection = db.collection("clips");
    }
    createClip(data: IClip): Promise<DocumentReference<IClip>> {
        return this.clipsCollection.add(data);
    }
    getUserClips() {
        return this.auth.user.pipe(
            switchMap((user) => {
                console.log("user", user);
                if (!user) {
                    return of([]);
                }

                //method for getting specific user-document from collection in db
                const query = this.clipsCollection.ref.where("uid", "==", user.uid);
                return query.get();
            })
        );
    }
}
