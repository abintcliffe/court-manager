import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberManagmentDialogComponent } from './member-managment-dialog.component';

describe('MemberManagmentDialogComponent', () => {
  let component: MemberManagmentDialogComponent;
  let fixture: ComponentFixture<MemberManagmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberManagmentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberManagmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
