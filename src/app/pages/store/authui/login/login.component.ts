import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
declare var UIkit: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email;
  password;
  pno;
  name;
  loading;
  uid;
  cartProduct;
  constructor(private authService: AuthService, private dataService: DataService, private router: Router) {

  }

  login() {
    // console.log(document.getElementById('login-modal'));
    this.authService.loginWithEmail(this.email, this.password).then(() => {
      this.router.navigate(['products']);
    }).catch(e => {
      UIkit.notification({ message: e.message, pos: 'top-right', status: 'danger' });
    });
  }
  ngOnInit(): void {
  }

}
