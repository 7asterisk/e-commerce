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
      UIkit.modal.dialog('login-modal').hide();
      const currentUrl = this.router.url;
      this.router.navigate([currentUrl]);
    });
  }
  signup() {
    this.authService.singup(this.email, this.password).then((user) => {
      console.log(user.user.uid);
      const userData = { name: this.name, email: this.email, pno: this.pno };
      this.dataService.addDoc('user', user.user.uid, userData);

    });
  }
  ngOnInit(): void {
  }

}
