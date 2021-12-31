import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { subscribeOn, take } from 'rxjs/operators';
import { Member } from 'src/app/_modals/members';
import { User } from 'src/app/_modals/user';
import { AccountService } from 'src/app/_service/account.service';
import { MembersService } from 'src/app/_service/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  member: Member;
  currentUser: User;

  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.currentUser = user));
  }

  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers() {
    this.memberService
      .getMember(this.currentUser.userName)
      .subscribe((_member) => {
        this.member = _member;
      });
  }
  updateMember() {
    console.log(this.member);
    this.toastr.success('Profile Updated Successfully.');
  }
}
