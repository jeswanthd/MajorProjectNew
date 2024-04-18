import { Injectable } from '@angular/core';
import { SharedModule } from '../app/shared/shared.module';
import { RegistrationInterface } from '../Models/registration-interface';
import axios from 'axios';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  validate:SharedModule=new SharedModule()
  AddAdminUrl:string;
    AddCustomerUrl:string;
  constructor(private router:Router,private http: HttpClient) { 
     this.AddAdminUrl="http://localhost:5161/api/Admins/AddAdmin"
      this.AddCustomerUrl="http://localhost:5161/api/Customers/AddCustomer"
  }




 

  addCustomer(customerdata: RegistrationInterface['customerdata']) {
    if (!this.validate.validateUsername(customerdata.CustomerName)) {
      alert("Enter Valid UserName");
    } else if (!this.validate.validatePassword(customerdata.CustomerPassword)) {
      alert("Password should contain at least 1 special character and minimum length");
    } else if (!this.validate.validatePasswordLength(customerdata.CustomerPassword)) {
      alert("Password must be at least 6 characters long");
    } else if (!this.validate.validateMobileNumber(customerdata.CustomerPhoneNo)) {
      alert("Mobile Number should contain 10 digits");
    } else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
  
      this.http.post<{ message: string }>(this.AddCustomerUrl, JSON.stringify(customerdata), { headers })
        .subscribe(
          (response) => {
            console.log(response);
            if (response.message === "Registered Successfully") {
              console.log("Registered Successfully");
              alert("Registered Successfully");
              this.router.navigate(['/login']);
            } else {
              console.error("Unexpected response:", response.message);
              alert("Unexpected response from the server. Please try again later.");
            }
          },
          (error: HttpErrorResponse) => {
            //console.error("Error registering customer:", error);
            console.log("Response body:", error.error); // Log the response body
  
            if (error.status === 400) {
              alert(error.error.message); // Display the error message returned from the server
            } else {
              alert("An error occurred while registering the customer. Please try again later.");
            }
            // Handle other error cases if needed
          }
        );
    }
  }
  
  
  
  
  


  addAdmin(admindata: RegistrationInterface['admindata']) {
    if (!this.validate.validateUsername(admindata.AdminName)) {
      alert("Enter Valid UserName");
    } else if (!this.validate.validatePassword(admindata.AdminPassword)) {
      alert("Password should contain at least 1 special character and minimum length");
    } else if (!this.validate.validatePasswordLength(admindata.AdminPassword)) {
      alert("Password must be at least 6 characters long");
    } else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
  
      this.http.post<{ message: string }>(this.AddAdminUrl, JSON.stringify(admindata), { headers })
        .subscribe(
          (response) => {
            if (response.message === "Username already exists") {
              alert(response.message);
            } else if (response.message === "Registered Successfully") {
              alert("Registered Successfully");
              this.router.navigate(['/login']);
            } else {
              alert(response.message)
              this.router.navigate(['/login']);
            }
          },
          (error: HttpErrorResponse) => {
            console.error("Error registering admin:", error);
            if (error.status === 400) {
              alert(error.error.message); // Display the error message returned from the server
            } else {
              alert("An error occurred while registering the admin. Please try again later.");
            }
          }
        );
    }
  }
  
  
}
