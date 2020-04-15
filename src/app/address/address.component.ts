import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  btnDisabled=false;
  currentAddress:any;
  constructor(private data:DataService, private rest:RestApiService ) { }

  async ngOnInit() {
    try {
      const data= await this.rest.get('http://localhost:3030/api/accounts/address');
      if(data['address']==='{}' && this.data.message===''){
        this.data.warning('Shipping address was not provided. Please provide');
      }
      this.currentAddress=data['address'];
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  async updateAddress(){
    this.btnDisabled=true;
    try {
      const res= await this.rest.post('http://localhost:3030/api/accounts/address',this.currentAddress);
      res['success']?(this.data.success(res['message']), await this.data.getProfile()):this.data.error(res['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled=false;
  }

}
