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
  totalPrice: number;
  totalDeposit: number;

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
          this.totalPrice = 0;
          this.totalDeposit = 0;
          console.log(cartData);
          this.allOrders = [...cartData];
          this.allOrders.forEach(element => {
            element.products.forEach(pr => {
              this.totalPrice += pr.total;
              this.totalDeposit += pr.deposit;
            });
          });
        });
      }
      else {
        this.uid = null;
      }
    });

  }

}
