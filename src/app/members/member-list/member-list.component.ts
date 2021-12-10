import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_modals/members';
import { MembersService } from 'src/app/_service/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
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
