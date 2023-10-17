import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD

=======
>>>>>>> 915e7a7 (create resources component)
import { ResourcesComponent } from './resources.component';

describe('ResourcesComponent', () => {
  let component: ResourcesComponent;
  let fixture: ComponentFixture<ResourcesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResourcesComponent]
    });
    fixture = TestBed.createComponent(ResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
