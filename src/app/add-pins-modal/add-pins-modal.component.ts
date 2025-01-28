import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';

interface pin {
  title: string,
  image: string,
  collaboratory: string[],
  privacy: string
}

interface Customer {
  name: string;
  email: string;
  region: string;
  country: string;
}


@Component({
  selector: 'app-add-pins-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSelectModule, FileUploadModule],
  templateUrl: './add-pins-modal.component.html',
  styleUrl: './add-pins-modal.component.css'
})
export class AddPinsModalComponent implements OnInit {
  @Input() modalId!: string ; // Unique ID for the modal
  @Output() pinData = new EventEmitter<pin>(); 

  uploader: FileUploader; //Uploader Declaration
  hasBaseDropZoneOver: boolean = false;
  imageUploaded: boolean = false;

  constructor(public apiService: AppService, public toastr: ToastrService,) {
    this.uploader = new FileUploader({
      url: '',
      disableMultipart: false, 
      autoUpload: false, 
      allowedFileType: ['image'], 
      allowedMimeType: ['image/jpeg', 'image/png', 'image/gif'],
      maxFileSize: 5 * 1024 * 1024
     
    });
    // event listener for file addition
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false; 
      this.convertToBase64(file._file); 
    };
 
    this.hasBaseDropZoneOver = false;
   }


  pinDetails: pin = {
    title: '',
    image: '',
    collaboratory: [],
    privacy: ''
  }
  collaboratorsData: Customer[] = [];
  collaborators: string[] = [];

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const base64String = event.target?.result as string;
      this.pinDetails.image = base64String;
      this.imageUploaded = true;
    };
    reader.readAsDataURL(file); 
  }
  isValid(){
    if(!this.pinDetails.title.trim()){
      this.toastr.warning('Title is required.');
      return false;
    }  else if(!this.pinDetails.image.trim()){
      this.toastr.warning('Please select a image.');
      return false;
    } else if(!this.pinDetails.collaboratory.length){
      this.toastr.warning('Please select a Collaborator');
      return false;
    } else if(!this.pinDetails.privacy.trim()){
      this.toastr.warning('Please select privacy');
      return false;
    }
    return true;
  }

  savePin() {
    if(this.isValid()){
      this.pinData.emit(this.pinDetails);
      this.pinDetails = {
        title: '',
        image: '',
        collaboratory: [],
        privacy: ''
      }
      this.removeImage(); 
    }
  }

  removeImage(){
    this.imageUploaded = false;
    this.pinDetails.image = '';
  }

  ngOnInit(): void {
    const customers = window.localStorage.getItem('customers');
    this.collaboratorsData = customers ? JSON.parse(customers) : [];
    this.collaborators = Array.from(new Set(this.collaboratorsData.map(item => item.name)));
  }

}
