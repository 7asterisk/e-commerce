import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartDetail: any[];
  products = [];
  uid;
  subtotal = 0;
  constructor(private dataService: DataService, private authService: AuthService) {
    this.authService.getUserId().subscribe(user => {
      if (user) {
        this.uid = user.uid;
        this.dataService.getCollecion(`user/${user.uid}/cart`).subscribe(cartData => {
          this.cartDetail = cartData;
          this.products = [];
          this.subtotal = 0;
          this.cartDetail.forEach(element => {
            this.dataService.getxyz('products', element.pid).subscribe(product => {
              this.subtotal = this.subtotal + product['price'] * element.qty;
              const cartProduct = { products: product, qty: element.qty, total: product['price'] * element.qty };
              this.products.push(cartProduct);
            });
          });
        });
      }
      else {
        this.uid = null;
      }
    });
  }
  deleteFromCart(pid) {
    this.dataService.deleteDoc(`user/${this.uid}/cart`, pid);
    this.subtotal = 0;
    this.products.forEach(element => {
      if (element.products.pid != pid) {
        this.subtotal = element.qty * element.products.price;
      }
    });
  }

  updateQty(pid, qty, i) {
    if (qty > 0) {
      this.products[i].qty = qty;
      this.subtotal = 0;
      this.products.forEach(element => {
        this.subtotal = element.qty * element.products.price;
        console.log(this.subtotal);
      });
      this.dataService.addDoc(`user/${this.uid}/cart`, pid, { pid: pid, qty: qty });
    } else {
      this.products[i].qty = 1;
      this.subtotal = 0;
      this.products.forEach(element => {
        this.subtotal = element.qty * element.products.price;
      });
    }

  }
  ngOnInit(): void {
  }

}
