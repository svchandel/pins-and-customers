import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-pins-modal',
  imports: [],
  templateUrl: './add-pins-modal.component.html',
  styleUrl: './add-pins-modal.component.css'
})
export class AddPinsModalComponent {
  @Input() modalId!: string ; // Unique ID for the modal
}
