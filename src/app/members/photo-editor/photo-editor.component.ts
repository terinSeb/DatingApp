import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_modals/members';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member;
  constructor() {}

  ngOnInit(): void {}
}
