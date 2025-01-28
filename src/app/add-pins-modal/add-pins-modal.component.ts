import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

interface pin {
  title: string,
  image: string,
  collaboratory: string[],
  privacy: string
}

@Component({
  selector: 'app-add-pins-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-pins-modal.component.html',
  styleUrl: './add-pins-modal.component.css'
})
export class AddPinsModalComponent {
  @Input() modalId!: string ; // Unique ID for the modal
  @Output() pinData = new EventEmitter<pin>(); // EventEmitter for passing data

  passData() {
    // this.pinData.emit(this.customerDetails); // Emit the data to the parent
  }

}
