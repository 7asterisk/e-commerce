import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private i = new BehaviorSubject(0);
  main = this.i.asObservable();
  private j = new BehaviorSubject(0);
  manu = this.j.asObservable();

  setmain(main) {
    this.i.next(main);
  }

  getmain(): Observable<any> {
    return this.main;
  }

  setmanu(main) {
    this.j.next(main);
  }
  getmanu(): Observable<any> {
    return this.manu;
  }


  items: Observable<any[]>;
  private itemsCollection: AngularFirestoreCollection<any>;
  private itemDoc: AngularFirestoreDocument<any>;

  constructor(public db: AngularFirestore, public afs: AngularFirestore, private http: HttpClient) {
    // db.collection('xyz').valueChanges();
  }

  getCollecion(main) {
    this.itemsCollection = this.db.collection<any>(main);
    return this.itemsCollection.valueChanges();
  }
  addCollection(main, data) {
    this.itemsCollection = this.db.collection(main);
    this.itemsCollection.add(data);
  }
  getxyz(main, name): Observable<any[]> {
    this.itemDoc = this.afs.doc(main + '/' + name);
    return this.itemDoc.valueChanges();
  }

  addDoc(main, name, data) {
    this.itemDoc = this.afs.doc(main + '/' + name);
    this.itemDoc.set(data);
  }
  update(data, name, main) {
    this.itemDoc = this.afs.doc(main + '/' + name);
    this.itemDoc.update(data);
  }

  deleteDoc(main, name) {
    this.itemDoc = this.afs.doc(main + '/' + name);
    this.itemDoc.delete();
  }

  getDocById(main) {
    this.itemsCollection = this.db.collection<any>(main);
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

}
