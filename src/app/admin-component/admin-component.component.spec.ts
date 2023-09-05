import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponentComponent } from './admin-component.component';

describe('AdminComponentComponent', () => {
  let component: AdminComponentComponent;
  let fixture: ComponentFixture<AdminComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponentComponent]
    });
    fixture = TestBed.createComponent(AdminComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
