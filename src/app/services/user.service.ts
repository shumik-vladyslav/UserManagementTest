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
  private ref = this.firestore.firestore.collection('users');

  constructor(private firestore: AngularFirestore) {
  }

  // first: number, limit: number, filter: Object, sort: Object
  getUsers(
    sort: { active: string, direction: "desc" | "asc" } = null,
  ): Promise<IUser> {
    let query = this.ref.limit(10);
    if (sort && sort.active) {
      query = query.orderBy(sort.active, sort.direction || 'desc')
    }
    return query.get()
      .then(querySnap => querySnap.docs)
      .then(docsSnap => docsSnap.map(dSnap => {
        const tmp = dSnap.data();
        // console.log(tmp);
        tmp.birthdate = tmp.birthdate ? tmp.birthdate.toDate() : null;
        return tmp;
      })) as Promise<IUser>
    // return this.ref.orderBy("population").get()
    // .pipe(
    //   take(1), 
    //   map(snap => snap.docs.map(dSnap => {
    //     const tmp = dSnap.data();
    //     tmp.birthdate = tmp.birthdate?tmp.birthdate.toDate():null;
    //     return tmp;
    //   } )), 
    //   tap(data => console.log(data)))
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

  getUser(id: string): Promise<IUser> {
    return this.ref.doc(id).get().then(dSnap => dSnap.data() as IUser)
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
