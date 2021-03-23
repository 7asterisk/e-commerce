import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  product;
  pid;
  imgIndex = 0;
  products;
  authenticated = false;
  uid;
  allreadyAdded = [];
  qty = 1;
  constructor(private dataService: DataService, private authService: AuthService, private route: ActivatedRoute) {


    this.route.params.subscribe(param => {
      this.pid = param.id;
      this.dataService.getxyz('products', this.pid).subscribe(product => {
        this.product = product;
      });
    });



    this.dataService.getCollecion('products').subscribe(products => {
      this.products = products;
    });
    this.authService.getUserId().subscribe(userData => {
      if (userData) {
        this.dataService.getCollecion(`user/${userData.uid}/cart`).subscribe(cartProduct => {
          this.allreadyAdded = [];
          cartProduct.forEach(element => {
            this.allreadyAdded.push(element.pid);
          });
        });
        this.authenticated = true;
        this.uid = userData.uid;
      } else {
        this.authenticated = false;
        this.allreadyAdded = [];
      }
    });
  }

  isAdded(pid) {
    return this.allreadyAdded.indexOf(pid);
  }
  addToCart(pid) {
    this.dataService.addDoc(`user/${this.uid}/cart`, pid, { pid: pid, qty: this.qty });
  }



  ngOnInit(): void {
  }

}
