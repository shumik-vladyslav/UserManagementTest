import { IUser } from './../entities/user.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // collection reference
  private get ref() {
    return this.firestore.collection('users')
  }
  constructor(private firestore: AngularFirestore) { }

  // first: number, limit: number, filter: Object, sort: Object
  getUsers() {
    return this.ref.get().pipe(
      take(1), 
      map(snap => snap.docs.map(dSnap => dSnap.data())), 
      tap(data => console.log(data)))
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


  createUser(user: IUser): Promise<DocumentReference> {
    return this.ref.add(user);
  }

  getUser(id: string): Observable<IUser> {
    return this.ref.doc(id).get().pipe(map(
      snap => snap.data() as IUser
    ));
  }

  deleteUser(userId: string): Promise<void> {
    return this.ref.doc(userId).delete();
  }

  // update(user: IUser) {
  //   const userId = user.id;
  //   delete user.id;
  //   this.firestore.doc(`${COLLECTION}/${userId}`).update(user);
  // }
}
