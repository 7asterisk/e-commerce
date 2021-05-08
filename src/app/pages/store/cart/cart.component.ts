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

  shippingDetails = { name: '', address: '', pincode: '', orderDate: Date.now(), phone: '', email: '' }
  shippingProduct = [];
  totalRefund = 0;
  totalRent = 0;
  constructor(private dataService: DataService, private authService: AuthService) {
  }

  deleteFromCart(pid) {
    this.dataService.deleteDoc(`user/${this.uid}/cart`, pid);
  }

  updateQty(pid, qty, i) {
    if (qty > 0) {
      this.products[i].qty = qty;
      this.subtotal = 0;
      this.products.forEach(element => {
        this.subtotal = element.qty * element.products.price;
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


  placeOrder() {

    this.dataService.addCollection(`user/${this.uid}/order`, { shippingDetails: this.shippingDetails, products: this.products }).then(() => {
      this.cartDetail.forEach(element => {
        this.dataService.deleteDoc(`user/${this.uid}/cart`, element.pid);
      });
    });

    // console.log(this.shippingDetails);
    // console.log(this.products);

  }

  ngOnInit(): void {
    this.authService.getUserId().subscribe(user => {
      if (user) {
        this.uid = user.uid;
        this.dataService.getCollecion(`user/${user.uid}/cart`).subscribe(cartData => {
          this.cartDetail = cartData;
          this.products = [];
          this.subtotal = 0;
          console.log(cartData);
          if (cartData.length === 0) {
            this.products = [];
            return;
          }
          this.cartDetail.forEach(element => {
            this.dataService.getxyz('categories/' + element.catId + '/products', element.pid).subscribe(product => {
              this.subtotal = this.subtotal + product['price'] + product['deposit'];
              this.totalRefund += product['deposit'];
              this.totalRent += product['price'];
              product["id"] = element.pid;
              product["rentingDate"] = element.rentingDate;
              product["returnDate"] = element.returnDate;
              const cartProduct = { products: product, total: product['price'] + product['deposit'], price: product['price'], deposit: product['deposit'] };
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

}
