import { Component } from '@angular/core';
import { ManagerService } from '../../Services/manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Manager } from '../../Models/manager';
import { error } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {
  managerId = 0
  ManagerName = "";
  ManagerArray:any=[];
  ResultListDisplay: any[] = []
  ResultListDisplay2: any[] = []
  searchtitle = "";
  selectedOrderId = "";
  selectedDriverId = "";
  selectedVehicleId = "";
  selected = "";
  ReEnteredPassword = "";

  constructor(private router: Router, private route: ActivatedRoute, private service: ManagerService) {

  }

  assigining: Manager['assign'] = {
    OrderId: 0,
    DriverDetails: 0,
    Destination: "",
    VehicleNum: ""

  }

  updateSelectedItem(item: string) {
    this.selected = item;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.managerId = params['managerid']
    })
    this.ManagerArray = this.service.getName(this.managerId)
    return this.managerId;
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

  displayCustomers() {
    this.ResultListDisplay = []
    this.ResultListDisplay = this.service.displayCustomers();
  }

  displayOrders() {
    this.ResultListDisplay2 = []
    this.ResultListDisplay2 = this.service.displayOrders();
  }
  allorders: any = []
  displayAllOrders() {
    this.allorders = []
    this.allorders = this.service.displayAllOrders();
  }
  displayResources() {
    this.ResultListDisplay = []
    this.ResultListDisplay = this.service.displayResources();
  }

  displayShipments() {
    this.ResultListDisplay = []
    this.ResultListDisplay = this.service.displayShipments();
  }

  ResultListDisplay3: any = []
  displayVehicles() {
    this.ResultListDisplay3 = []
    this.ResultListDisplay3 = this.service.displayVehicles();
  }

  AvailableDrivers: any = []
  displayAvailableDrivers() {
    this.AvailableDrivers = []
    this.AvailableDrivers = this.service.displayAvailableDrivers();
    console.log(this.AvailableDrivers)
  }
  AvailableVehicles: any = []
  displayAvailableVehicles() {
    this.AvailableVehicles = []
    this.AvailableVehicles = this.service.displayAvailableVehicles();
    console.log(this.AvailableVehicles)
  }



  AvailableOrders: any = []
  displayAvailableOrders() {
    this.AvailableOrders = []
    this.AvailableOrders = this.service.displayAvailableOrders();
    console.log(this.AvailableOrders)
  }
  async AssignOrder() {
    var res;
    this.ResultListDisplay2.forEach(element => {
      if (element.orderId == this.assigining.OrderId) {
        this.assigining.Destination = element.destination
      }
    }
    );
    try{
    await this.service.AssignOrder(this.assigining).subscribe((data) => {
      res = data
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
      text: ""+error
    });
  }
}



}

