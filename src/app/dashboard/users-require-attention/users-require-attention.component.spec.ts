import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRequireAttentionComponent } from './users-require-attention.component';

describe('UsersRequireAttentionComponent', () => {
  let component: UsersRequireAttentionComponent;
  let fixture: ComponentFixture<UsersRequireAttentionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersRequireAttentionComponent]
    });
    fixture = TestBed.createComponent(UsersRequireAttentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
