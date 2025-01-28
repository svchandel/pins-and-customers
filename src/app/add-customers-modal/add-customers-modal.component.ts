import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-customers-modal',
  imports: [],
  templateUrl: './add-customers-modal.component.html',
  styleUrl: './add-customers-modal.component.css'
})
export class AddCustomersModalComponent {
  @Input() modalId!: string ; // Unique ID for the modal

}
