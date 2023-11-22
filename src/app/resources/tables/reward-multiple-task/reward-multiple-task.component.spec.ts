import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardMultipleTaskComponent } from './reward-multiple-task.component';

describe('RewardMultipleTaskComponent', () => {
  let component: RewardMultipleTaskComponent;
  let fixture: ComponentFixture<RewardMultipleTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RewardMultipleTaskComponent]
    });
    fixture = TestBed.createComponent(RewardMultipleTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
