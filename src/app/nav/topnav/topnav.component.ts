import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {


  j = 1;
  url;
  uid;
  cartProduct;
  slideData = [
    {
      heading: 'Unique and affordable',
      subheading: 'We offer our clients a unique variety of affordable flooring products.',
      img: 'https://livedemo00.template-help.com/wt_prod-20688/images/slide-3-1920x850.jpg'
    }
  ];
  slide = this.slideData[0];
  // interval = setInterval(() => {
  //   {
  //     this.slide = this.slideData[this.j++];
  //     if (this.j === 3) { this.j = 0; }
  //   }
  // }, 5000);

  getBackground(image) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }
  constructor(private sanitizer: DomSanitizer, private router: Router, private dataService: DataService, private authService: AuthService) {

    this.authService.getUserId().subscribe(user => {
      if (user) {
        this.uid = user.uid;
        this.dataService.getCollecion(`user/${user.uid}/cart`).subscribe(data => {
          this.cartProduct = data;
        });
      } else {
        this.cartProduct = null;
        this.uid = null;
      }
    });


    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe(event => {
        if (event['url'] === '/home' || event['url'] === '/') {
          this.url = 'Home';
        } else if (event['url'] === '/about-us') {
          this.url = 'About Us';
        } else if (event['url'] === '/products') {
          this.url = 'Products';
        } else if (event['url'] === '/product-detail') {
          this.url = 'Product';
        } else if (event['url'] === '/checkout') {
          this.url = 'Checkout';
        } else if (event['url'] === '/cart') {
          this.url = 'Cart';
        } else if (event['url'] === '/contact-us') {
          this.url = 'Contact us';
        }
      });
  }

  ngOnInit(): void {
  }
  logout() {
    this.authService.signOut();
  }
}
