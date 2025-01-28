import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomersModalComponent } from './add-customers-modal.component';

describe('AddCustomersModalComponent', () => {
  let component: AddCustomersModalComponent;
  let fixture: ComponentFixture<AddCustomersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCustomersModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
