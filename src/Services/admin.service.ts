import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Console } from 'console';
import { Observable, catchError, throwError } from 'rxjs';
import { AdminInterface } from '../Models/admin-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../app/shared/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { json } from 'stream/consumers';
import Swal from 'sweetalert2';
import { url } from 'inspector';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  validate: SharedModule = new SharedModule();
  constructor(private http: HttpClient,

  ) { }

Url="http://localhost:5161/api/";
  InventoryUrl = this.Url+"Inventories";
  ManagerUrl = this.Url+"Managers";
  DriverUrl = this.Url+"Drivers";
  VehicleUrl = this.Url+"Vehicles";
  AdminUrl = this.Url+"Admins";
  CustomerUrl = this.Url+"Customers";
  OrdersUrl = this.Url+"ViewsDisplay/OrderdetailsView";
  ResourcesUrl = this.Url+"ViewsDisplay/ResurcesView";
  ShipmentUrl = this.Url+"ViewsDisplay/ShipmentsView";
  ResultListDisplay: any = []

  getDetailsofAdmin(adminid: number): Observable<any> {
    var array: any = [];
    this.http.get(this.AdminUrl + "/" + adminid).subscribe(data => {
      array.push(data);
    })
    return array;
  }
  displayInventory() {
    this.ResultListDisplay = []
    this.http.get<any>(this.InventoryUrl)
      .subscribe((data) => {
        this.ResultListDisplay.push(...data)
      });

    return this.ResultListDisplay
  }

  displayManager() {
    this.ResultListDisplay = []
    this.http.get<any>(this.ManagerUrl)
      .subscribe((data) => {
        this.ResultListDisplay.push(...data)
      });

    return this.ResultListDisplay
  }

  displayDrivers() {
    this.ResultListDisplay = []
    this.http.get<any>(this.DriverUrl)
      .subscribe((data) => {
        this.ResultListDisplay.push(...data)
      });

    return this.ResultListDisplay
  }

  displayVehicles() {
    this.ResultListDisplay = []
    this.http.get<any>(this.VehicleUrl)
      .subscribe((data) => {
        this.ResultListDisplay.push(...data)
      });

    return this.ResultListDisplay
  }

  displayCustomers() {
    this.ResultListDisplay = []
    this.http.get<any>(this.CustomerUrl)
      .subscribe((data) => {
        this.ResultListDisplay.push(...data)
      });

    return this.ResultListDisplay
  }

  displayOrders() {
    this.ResultListDisplay = []
    this.http.get<any>(this.OrdersUrl)
      .subscribe((data) => {
        this.ResultListDisplay.push(...data)
      });

    return this.ResultListDisplay
  }

  displayResources() {
    this.ResultListDisplay = []
    this.http.get<any>(this.ResourcesUrl)
      .subscribe((data) => {
        this.ResultListDisplay.push(...data)
      });

    return this.ResultListDisplay
  }

  displayShipments() {
    this.ResultListDisplay = []
    try {
      this.http.get<any>(this.ShipmentUrl)
        .subscribe((data) => {
          this.ResultListDisplay.push(...data)
        });
        console.log(this.ResultListDisplay);
    }
    catch {
      console.log("exception");
    }

    return this.ResultListDisplay
  }
  logout() {
    this.validate.logout();
  }



  addInventory(InventoryAdd: AdminInterface['InventoryAdd']): Observable<string> {
    if (InventoryAdd.ItemImg.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Add Image',
      });
      return throwError("Please add image");
    } else if (!this.validate.onQuantityInput(InventoryAdd.Quantity)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Quantity must be greater than 0',
      });
      return throwError("Quanitiy must be greater than 0");
    } else if (InventoryAdd.Price == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Price must be greater than 0',
      });
      return throwError("Price must be greater than 0");
    }

    return this.http.post(this.InventoryUrl, InventoryAdd, { responseType: 'text' });
  }


  AddManager(ManagerAdd: AdminInterface['ManagerAdd']): Observable<string> {
    if (!this.validate.validateUsername(ManagerAdd.managerName)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Enter Valid UserName',
      });
      return throwError("Enter Valid Details");
    } else if (!this.validate.validatePassword(ManagerAdd.managerPassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password should contain at least 1 special character',
      });
      return throwError("Enter Valid Details");
    } else if (!this.validate.validatePasswordLength(ManagerAdd.managerPassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password must be at least 6 characters',
      });
      return throwError("Enter Valid Details");
    } else if (!this.validate.validateMobileNumber(ManagerAdd.managerPhonoNo)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Enter Valid Mobile Number and it should contain 10 digits',
      });
      return throwError("Enter Valid Details");
    }
    return this.http.post(this.ManagerUrl, ManagerAdd, { responseType: 'text' });
  }


  AddDriver(DriverAdd: AdminInterface['DriverAdd']): Observable<string> {
    if (!this.validate.validateUsername(DriverAdd.driverName)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Enter Valid UserName',
      });
      return throwError("Enter Valid Details");
    } else if (!this.validate.validatePassword(DriverAdd.driverPassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password should contain at least 1 special character',
      });
      return throwError("Enter Valid Details");
    } else if (!this.validate.validatePasswordLength(DriverAdd.driverPassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password must be at least 6 characters',
      });
      return throwError("Enter Valid Details");
    } else if (!this.validate.validateMobileNumber(DriverAdd.driverPhoneNo)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Mobile Number should contain 10 digits',
      });
      return throwError("Enter Valid Details");
    }
    return this.http.post(this.DriverUrl, DriverAdd, { responseType: 'text' });
  }



  AddVehicle(VehicleAdd: AdminInterface['VehicleAdd']): Observable<string> {
    if (!this.validate.validateUsername(VehicleAdd.vehicleName)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Enter Valid VehicleName',
      });
      return throwError("Enter Valid Name");
    } else if (!this.validate.validateLicensePlate(VehicleAdd.vehicleNumber)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Enter Valid Vehicle Number',
      });
      return throwError("Enter Valid Vehicle Number");
    }
    return this.http.post(this.VehicleUrl, VehicleAdd, { responseType: 'text' });
  }



  UpdateInventory(InventoryAdd: AdminInterface['InventoryAdd'], updateInventoryArray: any): Observable<string> {
    const url = `${this.InventoryUrl}/${updateInventoryArray[0].itemId}`;

    if (InventoryAdd.ItemImg.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Add Image',
      });
      return throwError("Enter Valid Details");
    } else if (!this.validate.onQuantityInput(InventoryAdd.Quantity)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Quantity must be greater than 0',
      });
      return throwError("Enter Valid Details");
    } else if (InventoryAdd.Price == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Price must be greater than 0',
      });
      return throwError("Price must be greater than 0");
    }

    return this.http.put(url, InventoryAdd, { responseType: 'text' });
  }





  UpdateManager(ManagerAdd: AdminInterface['ManagerAdd'], UpdateManagerArray: any): Observable<string> {
    this.ManagerUrl = `${this.ManagerUrl}/${UpdateManagerArray[0].managerId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (!this.validate.validateUsername(ManagerAdd.managerName)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Enter Valid UserName',
      });
      return throwError("Enter Valid Details");
    } else if (!this.validate.validatePassword(ManagerAdd.managerPassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password should contain atleast 1 special character and min',
      });
      return throwError("Enter Valid Details");
    } else if (!this.validate.validatePasswordLength(ManagerAdd.managerPassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password must be min 6 characters',
      });
      return throwError("Enter Valid Details");
    } else if (!this.validate.validateMobileNumber(ManagerAdd.managerPhonoNo)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Enter Valid Moblie Number and it should contain 10 digits',
      });
      return throwError("Enter Valid Details");
    }

    return this.http.put(this.ManagerUrl, ManagerAdd, { responseType: 'text' });
  }




  UpdateDriver(DriverAdd: AdminInterface['DriverAdd'], UpdateDriverArray: any): Observable<string> {
    this.DriverUrl = `${this.DriverUrl}/${UpdateDriverArray[0].driverId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (!this.validate.validateUsername(DriverAdd.driverName)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Enter Valid UserName',
      });
      return throwError("Enter Valid Details");
    } else if (!this.validate.validatePassword(DriverAdd.driverPassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password should contain at least 1 special character',
      });
      return throwError("Enter Valid Details");
    } else if (!this.validate.validatePasswordLength(DriverAdd.driverPassword)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password must be min 6 characters',
      });
      return throwError("Enter Valid Details");
    } else if (!this.validate.validateMobileNumber(DriverAdd.driverPhoneNo)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Mobile Number should contain 10 digits',
      });
      return throwError("Enter Valid Details");
    }

    return this.http.put(this.DriverUrl, DriverAdd, { responseType: 'text' });
  }





  UpdateVehicle(VehicleAdd: AdminInterface['VehicleAdd'], UpdateVehicleArray: any): Observable<any> {
    console.log(UpdateVehicleArray[0].vehicleId);
    this.VehicleUrl = `${this.VehicleUrl}/${UpdateVehicleArray[0].vehicleId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put(this.VehicleUrl, VehicleAdd, { responseType: 'text' }).pipe(
      catchError(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred while updating the vehicle.',
        });
        return throwError(error);
      })
    );
  }


  DeleteInventory(updateInventoryArray: any): Observable<string> {
    const itemId = updateInventoryArray[0].itemId;
    return this.http.delete(`${this.InventoryUrl}/deleteItem/${itemId}`, { responseType: 'text' })
  }

  DeleteManager(UpdateManagerArray: any): Observable<string> {
    const itemId = UpdateManagerArray[0].managerId;
    return this.http.delete(`${this.ManagerUrl}/${itemId}`, { responseType: 'text' })
  }

  DeleteDriver(UpdateDriverArray: any): Observable<string> {
    var itemId = UpdateDriverArray[0].driverId;
    return this.http.delete(`${this.DriverUrl}/${itemId}`, { responseType: 'text' })
  }


  DeleteVehicle(UpdateVehicleArray: any): Observable<string> {
    var itemId = UpdateVehicleArray[0].vehicleId;
    return this.http.delete(`${this.VehicleUrl}/${itemId}`, { responseType: 'text' })
  }
}
