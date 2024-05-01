import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Member } from 'src/app/utils/member.interface';
import { TitleCasePipe } from '@angular/common';
import { GridApi } from 'ag-grid-community';
import { MemberService } from 'src/app/services/member.service';
import { MatDialog } from '@angular/material/dialog';
import { MembersDialogComponent } from '../members-dialog/members-dialog.component';

@Component({
  selector: 'app-member-managment-dialog',
  templateUrl: './member-managment-dialog.component.html',
  styleUrls: ['./member-managment-dialog.component.scss'],
})
export class MemberManagmentDialogComponent implements OnInit {
  @Output() updateMemberEvent = new EventEmitter();
  gridApi: GridApi | undefined;

  columnDefs: any[] = [
    {
      headerName: 'Name',
      colId: 'name',
      field: 'name',
      width: 240,
    },
    {
      headerName: 'Level',
      colId: 'level',
      field: 'level',
      valueFormatter: (data: any) => {
        return this.titeCase.transform(data.value);
      },
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['yellow', 'green', 'blue', 'red'],
      },
      width: 90,
    },
    {
      headerName: '',
      field: 'delete',
      flex: 1,
      cellRenderer: () => {
        return `<span class="material-icons icon__delete"> delete_forever </span>`;
      },
      editable: false,
      filter: false,
      sortable: false,
    },
  ];
  defaultColDef = {
    filter: true,
    editable: true,
    sortable: true,
  };

  rowData: Member[] = [];

  constructor(
    private titeCase: TitleCasePipe,
    private memberSerice: MemberService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMembers();
  }

  addMember(): void {}

  deleteMember(): void {}

  editMember(): void {}

  openNewMemberDialog(): void {
    const dialogRef = this.dialog.open(MembersDialogComponent);

    dialogRef.componentInstance.addMemberEvent.subscribe((event: Member) => {
      this.memberSerice.saveMemberToStorage(event);
      this.getMembers();
    });
  }

  openEditMemberDialog(memberId: number): void {
    console.log(memberId);
    const dialogRef = this.dialog.open(MembersDialogComponent);

    dialogRef.componentInstance.addMemberEvent.subscribe((event: Member) => {
      this.memberSerice.saveMemberToStorage(event);
      this.getMembers();
    });
  }

  getMembers() {
    this.rowData = this.memberSerice.getMembersFromStorage();
  }
}
