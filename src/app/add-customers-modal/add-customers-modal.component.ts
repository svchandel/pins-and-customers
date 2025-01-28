import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';



@Component({
  selector: 'app-add-customers-modal',
  standalone: true,
  imports: [CommonModule, NgxSelectModule, FormsModule],
  templateUrl: './add-customers-modal.component.html',
  styleUrl: './add-customers-modal.component.css'
})
export class AddCustomersModalComponent {
  @Input() modalId!: string ; // Unique ID for the modal
  @Output() customerData = new EventEmitter<string>(); // EventEmitter for passing data

  regions: string[] = [];
  selectedRegion: string = '';
  countries: string[] = [];
  selectedCountry: string = '';
  customerDetails = {
    title: '',
    email: '',
    region: this.selectedRegion,
    country: this.selectedCountry
  }

  storeCustomerData() {
    // this.customerData.emit(this.customerDetails); // Emit the data to the parent
  }
}
