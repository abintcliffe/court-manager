import { CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Member } from 'src/app/utils/member.interface';

@Component({
    selector: 'app-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit {
    @Input() boxItems: Member[] = [];
    @Output() openSidenav = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}

    dragMoved(event: CdkDragMove): void {
        if (event.pointerPosition.x < 30) {
            this.openSidenav.emit(true);
        }
    }
}
