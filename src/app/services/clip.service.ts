import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, QuerySnapshot } from "@angular/fire/compat/firestore";
import { IClip } from "../shared/types";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { BehaviorSubject, Observable, combineLatest, map, of, switchMap } from "rxjs";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class ClipService implements Resolve<IClip | null> {
    public clipsCollection: AngularFirestoreCollection<IClip>;
    pageClips: IClip[] = [];
    isPendingReq = false;

    constructor(private router: Router, private db: AngularFirestore, private auth: AngularFireAuth, private storage: AngularFireStorage) {
        this.clipsCollection = this.db.collection("clips");
    }
    createClip(data: IClip): Promise<DocumentReference<IClip>> {
        return this.clipsCollection.add(data);
    }
    getUserClips(sort$: BehaviorSubject<string>) {
        return combineLatest([this.auth.user, sort$]).pipe(
            switchMap((values) => {
                const [user, sort] = values;
                if (!user) {
                    return of([]);
                }

                //method for getting specific user-document from collection in db
                const query = this.clipsCollection.ref.where("uid", "==", user.uid).orderBy("timestamp", sort === "1" ? "desc" : "asc");
                return query.get();
            }),
            map((snapshot) => (snapshot as QuerySnapshot<IClip>).docs)
        );
    }
    updateClip(id: string, title: string): Promise<void> {
        return this.clipsCollection.doc(id).update({
            title,
        });
    }
    async deleteClip(clip: IClip) {
        const clipRef = this.storage.ref(`clips/${clip.fileName}`);
        const screenshotRef = this.storage.ref(`screenshots/${clip.screenshotFileName}`);
        await clipRef.delete();
        await screenshotRef.delete();
        await this.clipsCollection.doc(clip.id).delete();
    }

    async getClips() {
        if (this.isPendingReq) return;
        this.isPendingReq = true;
        //get latest 6 clips
        let query = this.clipsCollection.ref.orderBy("timestamp", "desc").limit(6);

        if (this.pageClips.length) {
            const lastDocID = this.pageClips[this.pageClips.length - 1].id;
            const lastDoc = await this.clipsCollection.doc(lastDocID).get().toPromise();
            query = query.startAfter(lastDoc);
        }

        const snapshot = await query.get();

        snapshot.forEach((doc) => {
            this.pageClips.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        this.isPendingReq = false;
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IClip | Observable<IClip | null> | Promise<IClip | null> | null {
        return this.clipsCollection
            .doc(route.params.id)
            .get()
            .pipe(
                map((snapshot) => {
                    const data = snapshot.data();
                    if (!data) {
                        this.router.navigate(["/"]);
                        return null;
                    }
                    return data;
                })
            );
    }
}
