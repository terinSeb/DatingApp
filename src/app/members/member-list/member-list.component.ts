import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_modals/members';
import { Pagination } from 'src/app/_modals/pagination';
import { MembersService } from 'src/app/_service/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members: Member[] = [];
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 5;

  constructor(private memberSerive: MembersService) {}

  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers() {
    this.memberSerive.getMembers(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        if (response.result && response.pagination) {
          this.members = response.result;
          this.pagination = response.pagination;
        }
      },
    });
  }
}
