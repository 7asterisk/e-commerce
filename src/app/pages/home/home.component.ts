import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService) { }
  products = []
  ngOnInit(): void {
    this.dataService.getDocById('categories/' + "mF0sa0B1ESxNf0TVIcMO" + '/products').subscribe(products => {
      this.products = products;
    })
  }
}
