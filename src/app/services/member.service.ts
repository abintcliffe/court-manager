import { Injectable } from '@angular/core';
import { Member } from '../utils/member.interface';
import { members } from '../utils/members';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor() {}

  getMembersFromStorage(): Member[] {
    let membersInStorage: Member[] = [];

    if (localStorage.getItem('members')) {
      membersInStorage = JSON.parse(localStorage['members']);
    } else {
      membersInStorage = members;
      localStorage['members'] = JSON.stringify(membersInStorage);
    }

    return membersInStorage;
  }

  saveMemberToStorage(member: Member): void {
    let membersInStorage: Member[] = [];
    membersInStorage = JSON.parse(localStorage['members']);
    membersInStorage.push(member);
    localStorage['members'] = JSON.stringify(membersInStorage);
  }

  getNextAvailableMemberId(): number {
    let membersInStorage: Member[] = [];

    if (localStorage.getItem('members')) {
      membersInStorage = JSON.parse(localStorage['members']);
      return membersInStorage[membersInStorage.length - 1].id + 1;
    } else {
      return 1;
    }
  }
}
