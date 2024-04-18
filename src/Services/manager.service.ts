import { Injectable } from '@angular/core';
import { SharedModule } from '../app/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { error } from 'console';
import { Manager } from '../Models/manager';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  validate: SharedModule = new SharedModule();


  constructor(private http: HttpClient,

  ) { }

Url="http://localhost:5161/api/"
  InventoryUrl = this.Url+"Inventories";
  ManagerUrl = this.Url+"Managers";
  DriverUrl = this.Url+"Drivers";
  CustomerUrl = this.Url+"Customers";
  VehicleUrl=this.Url+"Vehicles";
  OrdersUrl = this.Url+"ViewsDisplay/OrderdetailsView";
  AllOrders=this.Url+"Customers/GetAllOrders";
  ResourcesUrl = this.Url+"ViewsDisplay/ResurcesView";
  ShipmentUrl = this.Url+"ViewsDisplay/ShipmentsView";
  ResultListDisplay: any = []



  getName(managerid:number):Observable<any>{
    var array:any=[];
    this.http.get(this.ManagerUrl+"/"+managerid).subscribe(data=>{
      array.push(data);
    })
    console.log(array);
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

  displayCustomers() {
    this.ResultListDisplay = []
    this.http.get<any>(this.CustomerUrl)
      .subscribe((data) => {
        this.ResultListDisplay.push(...data)
      });

    return this.ResultListDisplay
  }
  ResultListDisplay2:any = []
  displayOrders() {
    this.ResultListDisplay2 = []
    this.http.get<any>(this.OrdersUrl)
      .subscribe((data) => {
        this.ResultListDisplay2.push(...data)
      });

    return this.ResultListDisplay2
  }
  allorders:any=[]
  displayAllOrders() {
    this.allorders = []
    this.http.get<any>(this.AllOrders)
      .subscribe((data) => {
        this.allorders.push(...data)
      });

    return this.allorders
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
    }
    catch {
      console.log("exception");
    }

    return this.ResultListDisplay
  }

  displayAvailableDrivers():Observable<any> {
    let allDrivers: any = []
    let availableDrivers: any = []
    try {
      this.http.get<any>(this.ResourcesUrl)
        .subscribe((data) => {
          data.forEach((element: any) => {
            allDrivers.push(element)
          });
          for (let i = 0; i < allDrivers.length; i++) {
            if (allDrivers[i].driverAvailabilityStatus == "yes") {
              availableDrivers.push(allDrivers[i]);
            }
          }
          
        });
    } catch {
      console.log("exception");
    }
    return availableDrivers;
  }
  
  displayAvailableVehicles():Observable<any> {
    let allVehicles: any = []
    let availablevehicles: any = []
    try {
      this.http.get<any>(this.VehicleUrl)
        .subscribe((data) => {
          data.forEach((element: any) => {
            allVehicles.push(element)
          });
          for (let i = 0; i < allVehicles.length; i++) {
            if (allVehicles[i].vehicleAvailabilityStatus == "yes") {
              availablevehicles.push(allVehicles[i]);
            }
          }
          
        });
    } catch {
      console.log("exception");
    }
    return availablevehicles;
  }
  displayAvailableOrders():Observable<any> {
    let allOrders: any = []
    let availableOrders: any = []
    try {
      this.http.get<any>(this.AllOrders)
        .subscribe((data) => {
          data.forEach((element: any) => {
            allOrders.push(element)
          });
          for (let i = 0; i < allOrders.length; i++) {
            if (allOrders[i].orderStatus == "Order Placed") {
              availableOrders.push(allOrders[i]);
            }
          }
          
        });
    } catch {
      console.log("exception");
    }
    return availableOrders;
  }

  ResultListDisplay3:any=[]
  displayVehicles(){
    this.ResultListDisplay3=[]
    this.http.get<any>(this.VehicleUrl)
    .subscribe((data) => {this.ResultListDisplay3.push(...data)
   });
 
       return this.ResultListDisplay3
  }

  AssignOrder(item:Manager['assign']):Observable<any>{
    var assignurl=this.ManagerUrl+"/AddAssign";
    return this.http.post(assignurl, item, { responseType: 'text' });
  }

}
