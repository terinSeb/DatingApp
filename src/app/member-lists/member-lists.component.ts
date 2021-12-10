import { Component, OnInit } from '@angular/core';
import { Member } from '../_modals/members';
import { MembersService } from '../_service/members.service';

@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css'],
})
export class MemberListsComponent implements OnInit {
  members: Member[];
  constructor(private memberSerive: MembersService) {}

  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers() {
    this.memberSerive.getMembers().subscribe((memb) => {
      this.members = memb;
    });
  }
}
