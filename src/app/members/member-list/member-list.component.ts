import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_modals/members';
import { Pagination } from 'src/app/_modals/pagination';
import { User } from 'src/app/_modals/user';
import { UserParams } from 'src/app/_modals/userParams';
import { AccountService } from 'src/app/_service/account.service';
import { MembersService } from 'src/app/_service/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
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
