import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;
  constructor(private af: AngularFireAuth, private router: Router) { }

  getUserId(): Observable<any> {
    return this.af.user;
  }
  signOut(): void {
    this.af.signOut().then(() => {
      this.router.navigate(['products']);
    })
  }

  singup(email, password) {
    return this.af.createUserWithEmailAndPassword(email, password);
  }

  loginWithEmail(email: string, password: string) {
    return this.af
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
}
