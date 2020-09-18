import { IUser } from './../entities/user.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // collection reference
  private ref = this.firestore.firestore.collection('users');

  constructor(private firestore: AngularFirestore) {
  }
  
  prevPageIdex = 0;
  firstPageDoc;
  lastPageDoc;
  
  getUserTotal(): Promise<number> {
    return this.firestore.firestore.doc('counters/user').get().then(dSnap => dSnap.data().total)
  }

  getUsers(
    page: { pageIndex: number, limit: number },
    filter: { field: string, value: any }[] = null,
  ): Promise<IUser[]> {
    let query: any = this.ref;

    if (filter && filter.length > 0) {
      query = filter.reduce((q, f) => q.where(f.field, "==", f.value), query);
    }
    
    query = query.orderBy('email', 'asc');

    if (page.pageIndex && page.pageIndex - this.prevPageIdex > 0) {
      query = query.startAfter(this.lastPageDoc)
    } else if (page.pageIndex && page.pageIndex  - this.prevPageIdex < 0) {
      query.startAt(this.firstPageDoc)
    } else if (page.pageIndex) {
      query.startAt(this.firstPageDoc)
    }

    this.prevPageIdex = page.pageIndex;
    if (page.limit) {
      query = query.limit(page.limit);  
    }

    return query.get()
      .then(querySnap => {
        this.firstPageDoc = querySnap.docs[0];
        this.lastPageDoc = querySnap.docs[querySnap.docs.length - 1];
        return querySnap.docs
      })
      .then(docsSnap => docsSnap.map(dSnap => {
        const tmp = dSnap.data();
        tmp.birthdate = tmp.birthdate ? tmp.birthdate.toDate() : null;
        return tmp;
      })) as Promise<IUser[]>
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
}
