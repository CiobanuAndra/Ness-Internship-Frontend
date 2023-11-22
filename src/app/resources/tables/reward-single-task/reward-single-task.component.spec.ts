import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardSingleTaskComponent } from './reward-single-task.component';

describe('RewardSingleTaskComponent', () => {
  let component: RewardSingleTaskComponent;
  let fixture: ComponentFixture<RewardSingleTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RewardSingleTaskComponent]
    });
    fixture = TestBed.createComponent(RewardSingleTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
