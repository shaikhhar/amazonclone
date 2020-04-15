import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product:any

  constructor(private data: DataService, 
              private rest: RestApiService,
              private activateRoute: ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(res=>{
      this.rest.get(`http://localhost:3030/api/product/${res.id}`).then(
        data=>{
          data['success']?
          this.product=data['product']:
          this.router.navigate(['/']);
        }
      ).catch(error=>{
        this.data.error(error['message']);
      })

    })
  }

}
