import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_service/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any ={};
loggedIn: Boolean;
  constructor(private accounServive: AccountService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }
  login(){
    this.accounServive.login(this.model).subscribe(response => {
      console.log(response);
      this.loggedIn = true;
    }, error => {
      console.log(error);
    })
  }
  logout(){
    this.accounServive.logout();
    this.loggedIn = false;
  }
getCurrentUser(){
  this.accounServive.currentUser$.subscribe(user => {
    this.loggedIn = !!user;
  },error =>{
    console.log(error);
  }
  )
}
}
