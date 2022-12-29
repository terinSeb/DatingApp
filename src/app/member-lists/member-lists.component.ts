import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../_modals/members';
import { Pagination } from '../_modals/pagination';
import { MembersService } from '../_service/members.service';

@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css'],
})
export class MemberListsComponent implements OnInit {
  // members$: Observable<Member[]>;
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
