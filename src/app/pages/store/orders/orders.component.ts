import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {


  uid;
  allOrders = [];
  order;

  constructor(private dataService: DataService, private authService: AuthService) {
  }

  deleteFromCart(pid) {
    this.dataService.deleteDoc(`user/${this.uid}/cart`, pid);
  }





  ngOnInit(): void {
    this.authService.getUserId().subscribe(user => {
      if (user) {
        this.uid = user.uid;
        this.dataService.getCollecion(`user/${user.uid}/order`).subscribe(cartData => {

          console.log(cartData);
          this.order = cartData[0];
          this.allOrders = [...cartData];

        });
      }
      else {
        this.uid = null;
      }
    });

  }

}
