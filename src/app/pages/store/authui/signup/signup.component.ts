import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
declare var UIkit: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  newUser = { name: '', email: '', pno: '', password: '' };
  loading = false;
  showPassword = false;

  constructor(private authService: AuthService, private dataService: DataService, private router: Router) {

  }




  signup() {

    if (Object.values(this.newUser).every(el => el.length > 0)) {
      if (!/^[a-zA-Z ]*$/.test(this.newUser.name) || this.newUser.name.length < 3) {
        UIkit.notification({ message: 'Name must be atlist 3 Alphabets.', pos: 'top-right', status: 'danger' });
        return;
      }
      if (this.newUser.pno.length !== 10 || ! /^\d+$/.test(this.newUser.pno)) {
        UIkit.notification({ message: 'Phone Number must be 10 digit', pos: 'top-right', status: 'danger' });
        return;
      }
      this.authService.singup(this.newUser.email, this.newUser.password).then((user) => {
        const userData = { name: this.newUser.name, email: this.newUser.email, pno: this.newUser.pno };
        this.dataService.addDoc('user', user.user.uid, userData);
        this.router.navigate(['/products'])
      }).catch(e => {
        UIkit.notification({ message: e.message, pos: 'top-right', status: 'danger' });
      });
    } else {
      UIkit.notification({ message: 'All field is mandatory', pos: 'top-right', status: 'danger' });
    }
  }


  ngOnInit(): void {

  }

}
