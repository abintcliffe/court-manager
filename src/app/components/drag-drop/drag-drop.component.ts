import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Member } from '../..//utils/member.interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss'],
})
export class DragDropComponent implements OnChanges {
  @Input() title = '';
  @Input() list: Member[] = [];
  @Input() activeLimit: number = 4;
  @Input() isSelectable: boolean = false;
  @Input() fixed: boolean = false;
  @Input() id = '';
  @Input() displayButtons = false;

  @Output() buttonClick: EventEmitter<any> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
  }

  toggleActive(index: number) {
    if (
      this.isSelectable &&
      index < 6 &&
      this.activeMemberCount() <= this.activeLimit
    ) {
      this.list[index].active = !this.list[index].active;
    } else if (this.isSelectable) {
      this.list[index].active = false;
      if (this.activeMemberCount() > this.activeLimit) {
        alert(`Can Only Select ${this.activeLimit} Members`);
      } else if (index > 5) {
        alert('Can Only Pick From Top 6');
      }
    }
  }

  activeMemberCount(): number {
    return this.list.filter((item) => item.active).length + 1;
  }

  exportActiveMembers(): Member[] {
    let exportedMembers: Member[] = this.list.filter((member) => member.active);
    this.list = this.list.filter((member) => !member.active);
    exportedMembers.forEach((member) => (member.active = false));

    return exportedMembers;
  }

  emitButtonClick(memberId: number) {
    this.buttonClick.emit(memberId);
  }
}
