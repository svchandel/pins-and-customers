import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPinsModalComponent } from './add-pins-modal.component';

describe('AddPinsModalComponent', () => {
  let component: AddPinsModalComponent;
  let fixture: ComponentFixture<AddPinsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPinsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPinsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
