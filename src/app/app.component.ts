import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Jsonp } from '@angular/http';
import { User } from './_modals/user';
import { AccountService } from './_service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';
users : any;
  constructor(private http: HttpClient,private accountService: AccountService){}

  ngOnInit(){
  this.getUsers();
  this.setCurrentUser();
  }
  setCurrentUser(){
const user: User = JSON.parse(localStorage.getItem('user'));
this.accountService.setCurrentUser(user);
  }
  getUsers(){
    this.http.get('https://localhost:44336/api/users').subscribe(
      response => {
 this.users = response
      },
      error =>{
        console.log(error)
      }
    );
  }

}
