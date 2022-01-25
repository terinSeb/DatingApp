import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @ViewChild('editFrom') editForm: NgForm;
  member: Member;
  currentUser: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
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
    this.editForm.reset(this.member);
  }
}
