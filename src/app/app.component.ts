import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddCustomersModalComponent } from "./add-customers-modal/add-customers-modal.component";
import { AddPinsModalComponent } from "./add-pins-modal/add-pins-modal.component";

interface pin {
    title: string,
    image: string,
    collaboratory: string[],
    privacy: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AddCustomersModalComponent, AddPinsModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor() {}

  pinsData: pin[] = [
    {
      title: 'Pin 1',
      image: 'Mark',
      collaboratory: ['Customer 1', 'Customer 2'],
      privacy: 'Public'
    }
]
}
