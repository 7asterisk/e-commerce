import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products = [];
  authenticated = false;
  uid;
  allreadyAdded = [];
  allCat = [];
  selectedCat = null;
  constructor(private dataService: DataService, private authService: AuthService) { }

  isAdded(pid) {
    return this.allreadyAdded.indexOf(pid);
  }
  addToCart(pid, catId) {
    this.dataService.addDoc(`user/${this.uid}/cart`, pid, { pid: pid, qty: 1, catId: catId });
  }
  changeCat(catId) {
    this.selectedCat = catId;
    this.getProduct(catId);
  }

  getProduct(catId) {
    this.dataService.getDocById('categories/' + catId + '/products').subscribe(products => {
      this.products = products;
    })
  }

  ngOnInit(): void {
    this.dataService.getDocById('categories').subscribe(cats => {
      console.log(cats);
      this.allCat = cats;
      this.changeCat(cats[cats.length - 1].id);
    })

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

}
