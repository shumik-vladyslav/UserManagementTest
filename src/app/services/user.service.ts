import { IUser } from './../entities/user.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const COLLECTION = 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  getUsers() {
    // this.firestore.collection(COLLECTION)
    //   .where("age", ">=", 20)
    //   .orderBy("age", "desc")
    //   .get()
    //   .then(snap => {
    //     snap.forEach(doc => {
    //       console.log(doc.data());
    //     });
    //   });
    // return this.firestore.collection(COLLECTION).snapshotChanges();
  }

  // Store student data in firestore
  create(user: IUser): Promise<DocumentReference> {
    return this.firestore.collection(COLLECTION).add(user);
  }

  getUser(id: string): Observable<IUser> {
    return this.firestore.collection(COLLECTION).doc(id).get().pipe(map (
      snap => snap.data() as IUser
    ));
  }
  // Delete a record
  delete(userId: string): Promise<void> {
    return this.firestore.doc(`${COLLECTION}/${userId}`).delete();
  }

  // // Update student data
  // update(user: IUser) {
  //   const userId = user.id;
  //   delete user.id;
  //   this.firestore.doc(`${COLLECTION}/${userId}`).update(user);
  // }
}
