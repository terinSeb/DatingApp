import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_service/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public accounServive: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  login() {
    this.accounServive.login(this.model).subscribe((response) => {
      this.router.navigateByUrl('/members');
    });
  }
  logout() {
    this.accounServive.logout();
    this.router.navigateByUrl('/');
  }
}
