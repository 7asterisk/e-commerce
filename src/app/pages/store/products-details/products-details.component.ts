import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare var UIkit;

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
  selectedCat;
  authenticated = false;
  uid;
  allreadyAdded = [];
  qty = 1;

  rentingDate: Date;
  rentingDays: any = 3;
  returnDate: Date;
  minDate = new Date();
  today = new Date();

  constructor(private dataService: DataService, private authService: AuthService, private route: ActivatedRoute) {
    this.minDate.setDate(this.today.getDate() + 2);
  }

  setReturnDate() {
    this.returnDate = new Date;
    this.returnDate.setDate(this.rentingDate.getDate() + parseInt(this.rentingDays))
  }
  isAdded() {
    return this.allreadyAdded.indexOf(this.pid);
  }
  addToCart() {
    if (this.rentingDate) {
      this.dataService.addDoc(`user/${this.uid}/cart`, this.pid, { pid: this.pid, catId: this.selectedCat, rentingDate: this.rentingDate, rentingDays: this.rentingDays, returnDate: this.returnDate });
    } else {
      UIkit.notification({ message: 'Please select Date.', pos: 'top-right' })
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.pid = param.id;
      this.selectedCat = param.catId;
      this.dataService.getxyz('categories/' + this.selectedCat + '/products', this.pid).subscribe(product => {
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

}
