import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { MinLengthValidator } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryId: any;
  category:any;
  page=1;


  constructor(private data: DataService, private rest: RestApiService, private activatedRoute: ActivatedRoute) { }

  async ngOnInit(){
    this.activatedRoute.params.subscribe(async res=>{
      console.log(res);
      this.categoryId=res.id;
      await this.getProducts();
      console.log(this.category);
    });
  }

  get lower(){
    return 10*(this.page-1)+1;
  }

  get upper(){
    return Math.min(10*this.page, this.category.totalProducts);
  }

  async getProducts(){
    // if(event){
    //   this.category=null;
    // }
    try {
      const data= await this.rest.get(`http://localhost:3030/api/categories/${this.categoryId}?page=${this.page-1}`);
      data['success']?this.category=data:this.data.error(data['message']);
    } catch (error) {
      this.data.error(error);
    }
  }

}
