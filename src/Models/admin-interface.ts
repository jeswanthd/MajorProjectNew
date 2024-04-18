export interface AdminInterface {
    
  InventoryAdd:{
    ItemName: string,
    ItemImg: string,
    Price:number,
    Quantity:0
  },

  ManagerAdd:{
    managerName: string,
    managerPassword: string,
    managerPhonoNo:string
  },

  DriverAdd:{
    driverName: string,
    driverPassword: string,
    driverPhoneNo:string
  },
  VehicleAdd:{
    vehicleId:number;
    vehicleName:string;
    vehicleNumber:string;
    vehicleAvailabilityStatus:string;
  }
}
