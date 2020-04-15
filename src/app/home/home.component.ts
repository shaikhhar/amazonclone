import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any
  constructor(private rest: RestApiService, private data: DataService) { }

  ngOnInit(): void {
    this.rest.get("http://localhost:3030/api/products").then(data=>{
      this.products=data['products'];
      console.log(data['products']);
    }).catch(err=>{this.data.error(err['message'])});
  }

}
