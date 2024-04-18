export interface CustomerInterfaces {
  PlaceOrder: {
    CustomerId: number,
    Destination: string,
    TotalBillAmount:number

  }
  PlaceOrderDetails: {
    orderId: number,
    itemid: number,
    itemQuantity: number,
    itemPrice:number
  }
  PlaceShipmentDetails:{
    orderId: number,
    orderDetailsId:number,
    destination:string,
   
  }
  CustomerDetails: {
    customerName: string,
    customerPassword: string,
    customerPhoneNo: string,
    customerAddress: string,
    customerWallet: number
  }
  CartDetails: {
    cartId: number,
    customerId: number,
    itemId: number,
    itemQuantity: number,
    itemPrice: number
  }
}
