import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  uid;
  subtotal;
  constructor(private dataService: DataService, private authService: AuthService) {
    this.authService.getUserId().subscribe(user => {
      if (user) {
        this.uid = user.uid;
        this.dataService.getCollecion(`user/${user.uid}/cart`).subscribe(cartData => {
          this.subtotal = 0;
          cartData.forEach(element => {
            this.dataService.getxyz('categories/' + element.catId + '/products', element.pid).subscribe(product => {
              this.subtotal = this.subtotal + product['price'] + product['deposit'];
            });
          });
        });
      }
      else {
        this.uid = null;
      }
    });
  }
  ngOnInit(): void {
  }

}
