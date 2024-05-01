import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from './utils/member.interface';
import { Court } from './utils/court.interface';
import { MemberService } from './services/member.service';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { MatDialog } from '@angular/material/dialog';
import { MemberManagmentDialogComponent } from './components/member-managment-dialog/member-managment-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('boardMembers') boardMembers!: DragDropComponent;

  unavailableMembers: Member[] = [];
  availableMembers: Member[] = [];
  courts: Court[] = [];
  title = 'badminton-club-sorter';
  activeMemberLimit = 4;

  constructor(private memberService: MemberService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.unavailableMembers = this.memberService.getMembersFromStorage();
    this.unavailableMembers[0].active = true;

    for (let i = 0; i < 4; i++) {
      const court: Court = {
        members: [],
        active: false,
      };
      this.courts.push(court);
    }
  }

  addCourt() {
    const court: Court = {
      members: [],
      active: false,
    };
    this.courts.push(court);
  }

  removeCourt() {
    this.removeMemebersFromCourt(this.courts.length - 1);
    this.courts.pop();
  }

  addMembersToCourt() {
    const court = this.courts.find((court) => !court.active);
    if (court) {
      if (this.checkActiveMemberLimit()) {
        court.active = true;
        court.members = this.boardMembers.exportActiveMembers();
        this.unavailableMembers = this.boardMembers.list.filter(
          (member) => !member.active
        );
        this.unavailableMembers[0].active = true;
      } else {
        alert(`${this.activeMemberLimit} Member's Should Be Slected`);
      }
    } else {
      alert('No Courts Are Available');
    }
  }

  removeMemebersFromCourt(index: number) {
    const winners: Member[] = this.courts[index].members.filter(
      (member) => member.active
    );
    const losers: Member[] = this.courts[index].members.filter(
      (member) => !member.active
    );

    winners.forEach((item) => (item.active = false));
    losers.forEach((item) => (item.active = false));
    this.unavailableMembers.push(...this.randomiseOrder(winners));
    this.unavailableMembers.push(...this.randomiseOrder(losers));

    this.courts[index].members = [];
    this.courts[index].active = false;
  }

  hasWinners(index: number): boolean {
    return (
      this.courts[index].members.filter((member) => member.active).length == 2
    );
  }

  randomiseOrder(list: Member[]) {
    return list
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  randomisePick() {
    this.unavailableMembers.forEach((item) => (item.active = false));
    this.unavailableMembers[0].active = true;
    const usedRandomNumber: number[] = [];
    while (this.unavailableMembers.filter((item) => item.active).length < 4) {
      const randomNumber: number = Math.floor(Math.random() * 5) + 1;
      if (!usedRandomNumber.includes(randomNumber)) {
        usedRandomNumber.push(randomNumber);
        this.unavailableMembers[randomNumber].active = true;
      }
    }
  }

  openMemberDialog() {
    this.dialog.open(MemberManagmentDialogComponent, {
      height: '700px',
    });
  }

  checkActiveMemberLimit(): boolean {
    return this.unavailableMembers.filter((item) => item.active).length == 4;
  }
}
