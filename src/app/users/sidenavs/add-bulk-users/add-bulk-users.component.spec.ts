import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBulkUsersComponent } from './add-bulk-users.component';

describe('AddBluckUsersComponent', () => {
  let component: AddBulkUsersComponent;
  let fixture: ComponentFixture<AddBulkUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBulkUsersComponent],
    });
    fixture = TestBed.createComponent(AddBulkUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
