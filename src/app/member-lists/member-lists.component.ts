import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member } from '../_modals/members';
import { Pagination } from '../_modals/pagination';
import { User } from '../_modals/user';
import { UserParams } from '../_modals/userParams';
import { AccountService } from '../_service/account.service';
import { MembersService } from '../_service/members.service';

@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css'],
})
export class MemberListsComponent implements OnInit {
  members: Member[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  user: User | undefined;

  constructor(
    private memberSerive: MembersService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          this.userParams = new UserParams(user);
          this.user = user;
        }
      },
    });
  }

  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers() {
    if (!this.userParams) return;
    this.memberSerive.getMembers(this.userParams).subscribe({
      next: (response) => {
        if (response.result && response.pagination) {
          this.members = response.result;
          this.pagination = response.pagination;
        }
      },
    });
  }
  pageChanged(event: any) {
    if (this.userParams && this.userParams?.pageNumber !== event.pageNumber) {
      this.userParams.pageNumber = event.page;
      this.loadMembers();
    }
  }
}
