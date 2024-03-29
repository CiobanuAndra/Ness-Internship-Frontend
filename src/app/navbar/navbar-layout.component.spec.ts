import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLayoutComponent } from './navbar-layout.component';

describe('NavbarComponent', () => {
  let component: NavbarLayoutComponent;
  let fixture: ComponentFixture<NavbarLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarLayoutComponent]
    });
    fixture = TestBed.createComponent(NavbarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
