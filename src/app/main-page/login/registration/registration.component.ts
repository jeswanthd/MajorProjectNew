import { Component } from '@angular/core';
import axios from 'axios';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';
import { RegistrationInterface } from '../../../../Models/registration-interface';
import { RegistrationService } from '../../../../Services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})

export class RegistrationComponent {
 
    titlelist=['Admin','Customer']
    validate:SharedModule=new SharedModule();
    searchDesignation="";
    name=""
    password=""
    rePassword=""
    mobilenumber=""
    address=""
    AddAdminUrl:string;
    AddCustomerUrl:string;
    constructor(private router: Router,private service:RegistrationService){
      this.AddAdminUrl="http://localhost:5161/api/Admins/post"
      this.AddCustomerUrl="http://localhost:5161/api/Customers/post"
    }
  
    onMobileNumberKeyPress(event: KeyboardEvent) {
      // Get the pressed key
      const key = event.key;
      // Allow only numeric characters (0-9) and certain control keys (e.g., backspace, delete, arrow keys)
      if (!/^\d$/.test(key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(key)) {
        event.preventDefault(); // Prevent the default action for non-numeric characters
      }
    }
    addCustomer(){
      var customerdata:RegistrationInterface['customerdata']={
        CustomerName:this.name,
        CustomerPassword:this.password,
        CustomerPhoneNo:this.mobilenumber,
        CustomerAddress:this.address,
        customerWallet:0
      }
      this.service.addCustomer(customerdata);
    }
      
    addAdmin(){
     var admindata:RegistrationInterface['admindata']={
        AdminName:this.name,
        AdminPassword:this.password
      }
      this.service.addAdmin(admindata);
  }
  
}
