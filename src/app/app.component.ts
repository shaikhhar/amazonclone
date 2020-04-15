import { DataService } from './data.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchTerm= '';
  isCollapsed= true;

  constructor(private router: Router, public data: DataService){
    this.data.getProfile();
  }

  get token(){
    return localStorage.getItem('token');
  }
  collapse(){
    this.isCollapsed=true;
  }
  closeDropdown(dropdown){
    dropdown.close();
  }
  logout(){
    this.data.user={};
    localStorage.removeItem('token');
    this.router.navigate(['']);

  }
  search(){}
}
