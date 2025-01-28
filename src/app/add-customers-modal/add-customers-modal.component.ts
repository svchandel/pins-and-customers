import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { AppService } from '../app.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

interface CountryInfo {
  country: string;
  region: string;
};

interface Countries {
  [key: string]: CountryInfo;
};

interface GroupedByRegion {
  [region: string]: string[];
};

@Component({
  selector: 'app-add-customers-modal',
  standalone: true,
  imports: [CommonModule, NgxSelectModule, FormsModule],
  templateUrl: './add-customers-modal.component.html',
  styleUrl: './add-customers-modal.component.css'
})
export class AddCustomersModalComponent implements OnInit {
  @Input() modalId!: string ; // Unique ID for the modal
  @Output() customerData = new EventEmitter<string>(); // EventEmitter for passing data

  constructor(public apiService: AppService, public toastr: ToastrService,) { }

  regions: string[] = [];
  countries: string[] = [];
  regionWithCountries: any = '';
  customerDetails = {
    name: '',
    email: '',
    region: '',
    country: ''
  }
  getRegionsAndCountries(){
    this.apiService.getRegionsAndCountries().subscribe({
      next: (result: any) => {
        if(result.status === "OK"){
          // Grouping countries by region
          const groupedByRegion: GroupedByRegion = {};
          const countries: Countries = result.data;
          for (const code in countries) {
            const country = countries[code];
            if (!groupedByRegion[country.region]) {
              groupedByRegion[country.region] = [];
            }
            groupedByRegion[country.region].push(country.country);
          }
          this.regionWithCountries = groupedByRegion
          this.regions = Object.keys(groupedByRegion);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log("An error occurred", error);
      }
    })
  }

  // Function to update countries list when region is selected
  onRegionChange(region: string) {
    this.customerDetails.region = region;
    this.customerDetails.country = ''; // Reset country selection
  }

  getCountriesForSelectedRegion(): string[] {
    return this.customerDetails.region ? this.regionWithCountries[this.customerDetails.region] : [];
  }

  validateEmail(email:string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  isValid(){
    if(!this.customerDetails.name.trim()){
      this.toastr.warning('Name is required.');
      return false;
    } else if(!this.validateEmail(this.customerDetails.email.trim())){
      this.toastr.warning('Please enter a valid email address');
      return false;
    } else if(!this.customerDetails.region.trim()){
      this.toastr.warning('Please select a region.');
      return false;
    } else if(!this.customerDetails.country.trim()){
      this.toastr.warning('Please select a country');
      return false;
    }
    return true;
  }

  saveCustomerInfo() {
    if(this.isValid()){
      const customers = window.localStorage.getItem('customers');
      const currentCustomers = customers ? JSON.parse(customers) : [];
      if(currentCustomers){
        currentCustomers.push(this.customerDetails);
      }
      window.localStorage.setItem("customers", JSON.stringify(currentCustomers));
      this.customerDetails = {
        name: '',
        email: '',
        region: '',
        country: ''
      }
      this.toastr.success('Customer added successfully');
    }
  }

  ngOnInit(): void {
    this.getRegionsAndCountries();
  }
}
