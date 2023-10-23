import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRequireAttentionTableComponent } from './users-require-attention-table.component';

describe('UsersRequireAttentionTableComponent', () => {
  let component: UsersRequireAttentionTableComponent;
  let fixture: ComponentFixture<UsersRequireAttentionTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersRequireAttentionTableComponent]
    });
    fixture = TestBed.createComponent(UsersRequireAttentionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
