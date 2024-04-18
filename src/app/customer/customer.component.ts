import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';
import { CustomerInterfaces } from '../../Models/customer-interfaces';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  customerId = 0
  name = "";
  selected = ""
  ResultListDisplay: any = []
  ResultListDisplayCart: any = []
  CustArray: any = []
  Money = 0
  selectedItemId = 0
  DefaultQuantity = 1
  Deliverdestination = "";



  PlaceOrder: CustomerInterfaces['PlaceOrder'] = {
    CustomerId: 0,
    Destination: "",
    TotalBillAmount: 0
  }
  PlaceOrderDetails: CustomerInterfaces['PlaceOrderDetails'] = {
    orderId: 0,
    itemid: 0,
    itemQuantity: 0,
    itemPrice: 0
  }
  PlaceShipmentDetails: CustomerInterfaces['PlaceShipmentDetails'] = {
    orderId: 0,
    orderDetailsId: 0,
    destination: ""
  }
  CustomerDetails: CustomerInterfaces['CustomerDetails'] = {
    customerName: "",
    customerPassword: "",
    customerPhoneNo: "",
    customerAddress: "",
    customerWallet: 0
  }
  CartDetails: CustomerInterfaces['CartDetails'] = {
    cartId: 0,
    customerId: 0,
    itemId: 0,
    itemQuantity: 1,
    itemPrice: 0
  }
  ReEnteredPassword = "";

  onQuantityChange(itemid: number, cartid: number, event: any) {
    let newQuantity = event.target.value;
    this.CartDetails.itemId = itemid;
    this.CartDetails.itemQuantity = newQuantity
    this.CartDetails.cartId = cartid
    this.CartDetails.customerId = this.customerId;
    this.service.updateItemQuantity(this.CartDetails.cartId, this.CartDetails.itemQuantity)
      .subscribe(
        (response) => {
          console.log('Quantity updated successfully:', response);
        },
        (error) => {
          console.error('Error updating quantity:', error);
        }
      );
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    this.CustomerCartItems.forEach((item: any) => {
      totalPrice += item.totalPriceOfItem;
    });
    return totalPrice;
  }

  LowWalletBalance: boolean = false;
  CheckBalance() {
    const totalprice = this.getTotalPrice();
    const walletmoney = this.CustomerDetails.customerWallet;
    if (totalprice > walletmoney) {
      this.LowWalletBalance = true;
    } else {
      this.LowWalletBalance = false;
    }
  }


  constructor(private router: Router, private route: ActivatedRoute, private service: CustomerService) {

  }
  displayInventory() {
    this.ResultListDisplay = []
    this.ResultListDisplay = this.service.displayInventory();
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.customerId = params['customerid']
    })
    this.CustArray = this.service.getName(this.customerId)
    return this.customerId;
  }
  updateSelectedItem(item: string) {
    this.selected = item;
  }
  onMobileNumberKeyPress(event: KeyboardEvent) {
    const key = event.key;
    if (!/^\d$/.test(key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      event.preventDefault();
    }
  }

  selectedlist: any = []
  // showCard(list: any) {
  //   this.selectedlist.push(list);
  // }
  CustomerCartItems: any = [];

  async DisplayCart() {
    this.CustomerCartItems = [];
    try {
      this.ResultListDisplayCart = await this.service.displayCart();
      this.ResultListDisplayCart.forEach((element: any) => {
        if (element.customerId == this.customerId) {
          this.CustomerCartItems.push(element);
        }
      });
      // console.log(this.CustomerCartItems);
    } catch (error) {
      console.error('Error occurred while fetching or filtering cart data:', error);
    }
  }


  async AddToCart(item: any) {
    await this.DisplayCart();
    let ItemExistInCart: boolean = false;
    this.CartDetails.customerId = this.customerId;
    this.CartDetails.itemId = item.itemId;
    this.CartDetails.itemQuantity = 1;
    this.CartDetails.itemPrice = item.price;
    console.log(this.CustomerCartItems);
    this.CustomerCartItems.forEach((element: any) => {
      if (element.customerId == this.customerId && element.itemId == item.itemId) {
        Swal.fire({
          icon: 'warning',
          title: 'Item Exists in Your Cart',
          text: 'Please check your cart before adding the item again.',
        });
        ItemExistInCart = true;
      }
    });
    if (!ItemExistInCart) {
      try {
        const res = await this.service.AddToCart(this.CartDetails).toPromise();
        Swal.fire({
          icon: 'success',
          title: 'Item Added to Cart',
          text: res, // Assuming the response is a success message
        });
      } catch (error) {
        console.error('Error occurred while adding item to cart:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while adding the item to cart.',
        });
      }
    }
  }
  placeOrder(item: any, destination: string) {
    this.PlaceOrder.CustomerId = this.customerId;
    this.PlaceOrder.Destination = destination;
    this.PlaceOrder.TotalBillAmount = this.getTotalPrice();
    console.log(this.PlaceOrder);
    this.service.placeorder(this.PlaceOrder).subscribe((orderIdResponse: any) => {
      const orderId: number = parseInt(orderIdResponse); 
      if (orderId > 0) {
        console.log("Order placed with ID:", orderId);
        const processOrderDetails = (element: any) => {
          this.PlaceOrderDetails.orderId = orderId;
          this.PlaceOrderDetails.itemid = element.itemId;
          this.PlaceOrderDetails.itemQuantity = element.cartItemQuantity;
          this.PlaceOrderDetails.itemPrice = element.price;
          console.log(this.PlaceOrderDetails);
          this.service.placeOrderDetails(this.PlaceOrderDetails).subscribe((orderDetailIdResponse: any) => {
            const orderDetailId: number = parseInt(orderDetailIdResponse);
            console.log("Order detail placed with ID:", orderDetailId);
            this.PlaceShipmentDetails.orderId = orderId;
            this.PlaceShipmentDetails.orderDetailsId = orderDetailId;
            this.PlaceShipmentDetails.destination = destination;
            console.log(this.PlaceShipmentDetails);
        
            this.service.placeShipmentDetails(this.PlaceShipmentDetails).subscribe(() => {
              console.log("Shipment details placed successfully");
              this.RemoveFromCart(element.cartId);
             
              if (element === this.CustomerCartItems[this.CustomerCartItems.length - 1]) {
                this.UpdateWalletAfterOrder();
                Swal.fire({
                    icon: 'success',
                    title: 'Order Placed Successfully',
                    text: 'Your order has been successfully placed.',
                    showConfirmButton: true,
                    confirmButtonText: 'OK'
                }).then((result) => {
                  
                });
            }
           
            
            }, (shipmentError) => {
              console.error("Error occurred while placing shipment details:", shipmentError);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while placing the shipment details. Please try again later.',
              });
            });
          }, (orderDetailError) => {
            console.error("Error occurred while placing order details:", orderDetailError);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while placing the order details. Please try again later.',
            });
          });
        };
  
        // Process order details for each item in the cart
        this.CustomerCartItems.forEach((element: any) => {
          processOrderDetails(element);
        });
      } else {
        console.error("Failed to place order. Response:", orderIdResponse);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to place the order. Please try again later.',
        });
      }
    }, (error) => {
      console.error("Error occurred while placing order:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while placing the order. Please try again later.',
      });
    });
  }
  
  



  RemoveFromCart(Cartid: number) {
    var res;
    this.service.RemoveFromCart(Cartid).subscribe((data) => {
      res = data;
      this.DisplayCart();
      this.updateSelectedItem('My Cart')
    })
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Item Removed",
      showConfirmButton: false,
      timer: 1500
    });

  }



  logout() {
    this.service.logout();
  }

  hideCard(event: MouseEvent) {
    this.selectedlist = [];
  }
  ResultListDisplay2: any = [];


  getOrders() {
    this.ResultListDisplay = [];
    this.ResultListDisplay2 = [];
    this.service.getCustomerOrders(this.customerId).subscribe((data) => {
      this.ResultListDisplay = data;
    });
  }
  CustomerOrdersDetails: any = [];


  GetOrdersDetails() {
    this.CustomerOrdersDetails = []
    this.service.GetOrdersDetails(this.customerId).subscribe((data) => {
      this.CustomerOrdersDetails.push(...data)
    });

  }

  GetCustomerData() {
    this.ResultListDisplay = []
    this.service.getCustomerDetails(this.customerId).subscribe((data) => {
      this.ResultListDisplay.push(data)

      this.CustomerDetails.customerName = this.ResultListDisplay[0].customerName
      this.CustomerDetails.customerPassword = this.ResultListDisplay[0].customerPassword
      this.CustomerDetails.customerPhoneNo = this.ResultListDisplay[0].customerPhoneNo
      this.CustomerDetails.customerAddress = this.ResultListDisplay[0].customerAddress
      this.CustomerDetails.customerWallet = this.ResultListDisplay[0].customerWallet

    })
  }

  UpdateCustomer() {
    var res;
    this.service.UpdateCustomer(this.CustomerDetails, this.customerId).subscribe((data) => {
      res = data;
      alert(res)
    }
    )
  }
  AddMoneyToWallet(mon: number) {

    var res;


    var sum = this.CustomerDetails.customerWallet + mon

    this.CustomerDetails.customerWallet = sum

    this.service.UpdateWallet(this.CustomerDetails, this.customerId).subscribe((data) => {
      res = data;
      this.Money = 0;
      sum = 0;
      Swal.fire({
        icon: 'success',
        title: res,
      })
    }
    )

  }

  async UpdateWalletAfterOrder() {
    var res;
    var sum = this.CustomerDetails.customerWallet - this.getTotalPrice();
    this.CustomerDetails.customerWallet = sum
    await this.service.UpdateWallet(this.CustomerDetails, this.customerId).subscribe((data) => {
      res = data;

      this.Money = 0;
    }
    )
  }



  //sEARCH 
  searchText: string = '';
  get filteredOrders(): any[] {
    if (!this.searchText.trim()) {

      return this.ResultListDisplay;
    }
    return this.ResultListDisplay.filter((order: any) =>
      (order && order.orderId && order.orderId.toString().includes(this.searchText.trim())) ||
      (order && order.itemName && order.itemName.toLowerCase().includes(this.searchText.trim().toLowerCase())) ||
      (order && order.expectedDelivery && order.expectedDelivery.toLowerCase().includes(this.searchText.trim().toLowerCase())) ||
      (order && order.orderStatus && order.orderStatus.toLowerCase().includes(this.searchText.trim().toLowerCase())) ||
      (order && order.destination && order.destination.toLowerCase().includes(this.searchText.trim().toLowerCase()))
    );
  }
  selectedOrder: any;

  displayShipments() {
    this.ResultListDisplay = []
    this.ResultListDisplay = this.service.displayShipments();
    console.log(this.ResultListDisplay)
  }




}
