import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverService } from '../../Services/driver.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css'
})
export class DriverComponent {

  constructor(private router: Router, private route: ActivatedRoute, private service: DriverService,private dialog: MatDialog) {
 
  }
  selected = "";
  driverid:number=0;
  DriverArray:any=[];
  ResultListDisplay:any=[];
  ResultListDisplay2:any=[];
  UpdateStatus = ['Intransit', 'Delivered', 'Return'];
  selectedOrderId="";
  selectedOrderStatus="";
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.driverid = params['driverid']
      console.log(this.driverid);
    })
    this.DriverArray = this.service.getDetailsOfDriver(this.driverid)
  }
  updateSelectedItem(item: string) {
    this.selected = item;
  }
  getOrders(){
      this.ResultListDisplay = [];

      this.service.getDriverOrders(this.driverid).subscribe((data) => {
        this.ResultListDisplay = data;
      
       
      });
  }

 GetPendingOrders(){
    this.ResultListDisplay2=[]
    this.service.GetPendingOrders().subscribe((data) => {
      this.ResultListDisplay2 = data;   
    });
 }

 logout(){
  this.service.logout();
 }

 UpdateOrder(item: any): void {
  Swal.fire({
      title: "What do you want to update the order to?",
      input: "select",
      inputOptions: {
          "InTransit": "InTransit",
          "Delivered": "Delivered"
      },
      inputPlaceholder: "Select status",
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
          return new Promise((resolve) => {
              if (value !== "") {
                  resolve();
              } else {
                  resolve("You need to select a status");
              }
          });
      }
  }).then((result) => {
      if (result.isConfirmed) {
          const selectedStatus = result.value;
          // Now you can handle the selected status and update the order accordingly
          this.handleStatusUpdate(selectedStatus ,item);
      }
  });
}

handleStatusUpdate(selectedStatus: string, item: any): void {
  var res;
  this.service.UpdateStatus(item, selectedStatus).subscribe((data) => {
    res = data;

    Swal.fire({
      icon: 'success',
      text: res,
      showConfirmButton: true, // Show confirm button
      confirmButtonText: 'Ok', // Customize the text of the confirm button
    }).then((result) => {
      if (result.isConfirmed) { // Check if the user pressed the confirm button
        window.location.reload(); 
       
      }
    });
  });
}


isOrderDelivered(order: any): boolean {
 var status=false
 this.ordersArray.forEach((element: { orderId: any; orderStatus: string; }) => {
    if(order.orderId==element.orderId && element.orderStatus=="Delivered"){
      status=true;
    }
 });
 return status;
}


  showDetails: boolean = false;
    selectedOrder: any; 
  showOrderDetails(item: any): void {
    this.service.showOrderdetails(item.orderId).subscribe((data) => {
        this.ResultListDisplay2 = data;
        this.showDetails = true; // Show overlay and order details
    });
}
closeDetails(): void {
  this.showDetails = false; // Hide overlay and order details
}

ordersArray:any=[]
GettingDriverOrders(){
  this.service.GettingDriverOrders(this.driverid).subscribe((data)=>{
    this.ordersArray.push(...data);
  })
}

}
