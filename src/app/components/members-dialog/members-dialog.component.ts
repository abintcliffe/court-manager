import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from 'src/app/services/member.service';
import { Level } from 'src/app/utils/member.interface';

@Component({
  selector: 'app-members-dialog',
  templateUrl: './members-dialog.component.html',
  styleUrls: ['./members-dialog.component.scss'],
})
export class MembersDialogComponent implements OnInit {
  @Output() addMemberEvent = new EventEmitter();
  memberForm: FormGroup = this.fb.group({});
  levels: Level[] = [Level.Yellow, Level.Green, Level.Blue, Level.Red];

  constructor(private fb: FormBuilder, private memberService: MemberService) {}

  ngOnInit(): void {
    this.memberForm = this.fb.group({
      id: [this.memberService.getNextAvailableMemberId()],
      name: ['', Validators.required],
      level: ['yellow'],
      active: [false],
    });
  }

  addMember(): void {
    if (this.memberForm.valid) {
      this.addMemberEvent.emit(this.memberForm.value);
      this.memberForm.patchValue({
        id: '',
        name: '',
        level: 'yellow',
        active: [false],
      });
    }
  }
}
