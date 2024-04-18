import { Component } from '@angular/core';
import axios from 'axios';
import { SharedModule } from '../shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminInterface } from '../../Models/admin-interface';
import { AdminService } from '../../Services/admin.service';
import { error } from 'console';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  adminId = 0
  AdminArray: any = [];
  ResultListDisplay: any[] = []
  searchtitle = "";
  selected = "";
  ReEnteredPassword = "";

  InventoryAdd: AdminInterface['InventoryAdd'] = {
    ItemName: "",
    ItemImg: "",
    Price: 0,
    Quantity: 0
  }
  ManagerAdd: AdminInterface['ManagerAdd'] = {
    managerName: "",
    managerPassword: "",
    managerPhonoNo: ""
  }
  DriverAdd: AdminInterface['DriverAdd'] = {
    driverName: "",
    driverPassword: "",
    driverPhoneNo: ""
  }
  VehicleAdd: AdminInterface['VehicleAdd'] = {
    vehicleId: 0,
    vehicleName: "",
    vehicleNumber: "",
    vehicleAvailabilityStatus: "yes"
  }

  validate: SharedModule = new SharedModule();
  isCollapsedInventory: boolean = true;
  isCollapsedManager: boolean = true;
  isCollapsedDriver: boolean = true;
  isCollapsedVehicle: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private service: AdminService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.adminId = params['adminid']
    })
    this.AdminArray = this.service.getDetailsofAdmin(this.adminId)
    return this.adminId;
  }

  onMobileNumberKeyPress(event: KeyboardEvent) {
    const key = event.key;
    if (!/^\d$/.test(key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      event.preventDefault();
    }
  }
  toggleCollapseInventory() {
    this.isCollapsedInventory = !this.isCollapsedInventory;
  }
  toggleCollapseManager() {
    this.isCollapsedManager = !this.isCollapsedManager;
  }
  toggleCollapseDriver() {
    this.isCollapsedDriver = !this.isCollapsedDriver;
  }
  toggleCollapseVehicle() {
    this.isCollapsedVehicle = !this.isCollapsedVehicle;
  }

  updateSelectedItem(item: string) {
    this.selected = item;
  }

  onFileSelected(event: any) {
    const selectedFiles: FileList = event.target.files;
    if (selectedFiles.length > 0) {
      this.InventoryAdd.ItemImg = selectedFiles[0].name;
    } else {
      this.InventoryAdd.ItemImg = '';
    }
  }


  displayInventory() {
    this.ResultListDisplay = []
    this.ResultListDisplay = this.service.displayInventory();
  }


  displayManager() {
    this.ResultListDisplay = []
    this.ResultListDisplay = this.service.displayManager();
  }


  displayDrivers() {
    this.ResultListDisplay = []
    this.ResultListDisplay = this.service.displayDrivers();
  }


  displayVehicles() {
    this.ResultListDisplay = []
    this.ResultListDisplay = this.service.displayVehicles();
  }


  displayCustomers() {
    this.ResultListDisplay = []
    this.ResultListDisplay = this.service.displayCustomers();
  }


  displayOrders() {
    this.ResultListDisplay = []
    this.ResultListDisplay = this.service.displayOrders();
  }


  displayResources() {
    this.ResultListDisplay = []
    this.ResultListDisplay = this.service.displayResources();
  }


  displayShipments() {
    this.ResultListDisplay = []
    this.ResultListDisplay = this.service.displayShipments();
  }


  logout() {
    this.service.logout();
  }


  async AddInventory() {
    var res; var err;
    console.log(this.InventoryAdd)
    try {
      await this.service.addInventory(this.InventoryAdd).subscribe((data) => {
        res = data;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res,
          showConfirmButton: true
        }).then((result) => { // Corrected syntax for then method
          if (result.isConfirmed) { // Check if the user pressed the confirm button
            window.location.reload();
          }
        });
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "" + error
      });
    }
  }


  async AddManager() {
    var res; var err;
    try {
      await this.service.AddManager(this.ManagerAdd).subscribe((data) => {
        res = data;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res,
          showConfirmButton: true
        }).then((result) => { // Corrected syntax for then method
          if (result.isConfirmed) { // Check if the user pressed the confirm button
            window.location.reload();
          }
        });
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "" + error
      });
    }
  }

  async AddDriver() {
    var res; var err;
    try {
      await this.service.AddDriver(this.DriverAdd).subscribe((data) => {
        res = data;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res,
          showConfirmButton: true
        }).then((result) => { // Corrected syntax for then method
          if (result.isConfirmed) { // Check if the user pressed the confirm button
            window.location.reload();
          }
        });
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "" + error
      });
    }
  }

  async AddVehicle() {
    var res; var err;
    try {
      await this.service.AddVehicle(this.VehicleAdd).subscribe((data) => {
        res = data;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res,
          showConfirmButton: true
        }).then((result) => { // Corrected syntax for then method
          if (result.isConfirmed) { // Check if the user pressed the confirm button
            window.location.reload();
          }
        });
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "" + error
      });
    }
  }


  UpdateInventoryArray: any = [];
  GetInventoryData() {

    this.UpdateInventoryArray = [];

    this.ResultListDisplay.forEach(elements => {
      if (elements.itemName == this.searchtitle) {
        this.UpdateInventoryArray.push(elements)
        console.log(this.UpdateInventoryArray);
      }
    });
    this.InventoryAdd.ItemName = this.UpdateInventoryArray[0].itemName,
      this.InventoryAdd.ItemImg = this.UpdateInventoryArray[0].itemImg,
      this.InventoryAdd.Quantity = this.UpdateInventoryArray[0].quantity
    this.InventoryAdd.Price = this.UpdateInventoryArray[0].price
  }


  async UpdateInventory() {
    var res; var err;
    try {
      await this.service.UpdateInventory(this.InventoryAdd, this.UpdateInventoryArray).subscribe((data) => {
        res = data;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res,
          showConfirmButton: true
        }).then((result) => { // Corrected syntax for then method
          if (result.isConfirmed) { // Check if the user pressed the confirm button
            window.location.reload();
          }
        });
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "" + error
      });
    }

  }


  UpdateManagerArray: any = [];
  GetManagerData() {
    this.UpdateManagerArray = [];
    console.log("this " + this.searchtitle)
    console.log(this.ResultListDisplay)

    this.ResultListDisplay.forEach(elements => {
      if (elements.managerName == this.searchtitle) {
        this.UpdateManagerArray.push(elements)
        console.log(this.UpdateManagerArray)
      }
    });
    this.ManagerAdd.managerName = this.UpdateManagerArray[0].managerName,
      this.ManagerAdd.managerPassword = this.UpdateManagerArray[0].managerPassword,
      this.ManagerAdd.managerPhonoNo = this.UpdateManagerArray[0].managerPhonoNo
  }


  async UpdateManager() {
    var res; var err;
    try {
      await this.service.UpdateManager(this.ManagerAdd, this.UpdateManagerArray).subscribe((data) => {
        res = data;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res,
          showConfirmButton: true
        }).then((result) => { // Corrected syntax for then method
          if (result.isConfirmed) { // Check if the user pressed the confirm button
            window.location.reload();
          }
        });
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "" + error
      });
    }
  }


  UpdateDriverArray: any = [];
  GetDriverData() {
    this.UpdateDriverArray = [];
    console.log("this " + this.searchtitle)
    console.log(this.ResultListDisplay)

    this.ResultListDisplay.forEach(elements => {
      if (elements.driverName == this.searchtitle) {
        this.UpdateDriverArray.push(elements)
        console.log(this.UpdateDriverArray)
      }
    });
    this.DriverAdd.driverName = this.UpdateDriverArray[0].driverName,
      this.DriverAdd.driverPassword = this.UpdateDriverArray[0].driverPassword,
      this.DriverAdd.driverPhoneNo = this.UpdateDriverArray[0].driverPhoneNo
  }


  UpdateDriver() {
    var res; var err;
    try {
      this.service.UpdateDriver(this.DriverAdd, this.UpdateDriverArray).subscribe((data) => {
        res = data;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res
        })
          ;
      })
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: res
      })
    }
    this.selected = ''
    this.searchtitle = ''

  }

  UpdateVehicleArray: any = [];
  GetVehicleData() {
    this.UpdateVehicleArray = [];
    console.log("this " + this.searchtitle)
    console.log(this.ResultListDisplay)

    this.ResultListDisplay.forEach(elements => {
      if (elements.vehicleNumber == this.searchtitle) {
        this.UpdateVehicleArray.push(elements)
        console.log(this.UpdateVehicleArray)
      }
    });
    this.VehicleAdd.vehicleId = this.UpdateVehicleArray[0].vehicleId,
      this.VehicleAdd.vehicleName = this.UpdateVehicleArray[0].vehicleName,
      this.VehicleAdd.vehicleNumber = this.UpdateVehicleArray[0].vehicleNumber,
      this.VehicleAdd.vehicleAvailabilityStatus = this.UpdateVehicleArray[0].vehicleAvailabilityStatus
  }


  UpdateVehicle() {
    try {
      this.service.UpdateVehicle(this.VehicleAdd, this.UpdateVehicleArray).subscribe((data) => {
        const res = data; // Define res within the scope of the subscribe callback
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res,
          showConfirmButton: true
        }).then((result) => { // Corrected syntax for then method
          if (result.isConfirmed) { // Check if the user pressed the confirm button
            window.location.reload();
          }
        });
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "" + error
      });
    }

  }


async DeleteInventory() {
  try {
    const confirmed = await Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You are about to delete this inventory item. This action cannot be undone.',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (confirmed.isConfirmed) {
      this.service.DeleteInventory(this.UpdateInventoryArray).subscribe((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: data,
          showConfirmButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: "" + error
    });
  }
}


  async DeleteManager() {
    var res; var err;
    try {
      await this.service.DeleteManager(this.UpdateManagerArray).subscribe((data) => {
        res = data;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res,
          showConfirmButton: true
        }).then((result) => { // Corrected syntax for then method
          if (result.isConfirmed) { // Check if the user pressed the confirm button
            window.location.reload();
          }
        });
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "" + error
      });
    }
  }


  async DeleteDriver() {
    var res; var err;
    try {
      await this.service.DeleteDriver(this.UpdateDriverArray).subscribe((data) => {
        res = data;
        Swal.fire({
          icon: 'error',
          title: res,
          
          showConfirmButton: true
        }).then((result) => { // Corrected syntax for then method
          if (result.isConfirmed) { // Check if the user pressed the confirm button
            window.location.reload();
          }
        });
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "" + error
      });
    }
  }

  DeleteVehicle() {
    var res; var err;
    try {
      this.service.DeleteVehicle(this.UpdateVehicleArray).subscribe((data) => {
        res = data;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res,
          showConfirmButton: true
        }).then((result) => { // Corrected syntax for then method
          if (result.isConfirmed) { // Check if the user pressed the confirm button
            window.location.reload();
          }
        });
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "" + error
      });
    }
  }


}
