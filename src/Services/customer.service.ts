import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerInterfaces } from '../Models/customer-interfaces';
import { Observable, catchError, map, share } from 'rxjs';
import { SharedModule } from '../app/shared/shared.module';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  Url="http://localhost:5161/api/"
  InventoryUrl = this.Url+"Inventories";
  CustomerUrl=this.Url+"Customers";
  CartVeiwUrl=this.Url+"ViewsDisplay/CartView";
  CartUrl=this.Url+"Carts";
  ResultListDisplay: any = []
  CustomerOrdersUrl = "";
  shared=new SharedModule();
  constructor(private http: HttpClient) { }
  getName(cusid:number):Observable<any>{
    var array:any=[];
    this.http.get(this.CustomerUrl+"/"+cusid).subscribe(data=>{
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


  async displayCart() {
    try {
        const data = await this.http.get<any>(this.CartVeiwUrl).toPromise();
        return data;
    } catch (error) {
        console.error('Error occurred while fetching cart data:', error);
        return [];
    }
}



  AddToCart(item:CustomerInterfaces['CartDetails']):Observable<string>{
    return this.http.post("http://localhost:5161/api/Carts", item, { responseType: 'text' })
  }
  placeorder(item:CustomerInterfaces['PlaceOrder']):Observable<string>{
    return this.http.post("http://localhost:5161/api/Customers/insertorder", item, { responseType: 'text' })
  }
  placeOrderDetails(item:CustomerInterfaces['PlaceOrderDetails']):Observable<string>{
    return this.http.post("http://localhost:5161/api/Customers/insertorderDetail", item, { responseType: 'text' })
  }
  placeShipmentDetails(item:CustomerInterfaces['PlaceShipmentDetails']):Observable<any>{
    return this.http.post("http://localhost:5161/api/Customers/shipments", item, { responseType: 'text' })
  }
  // placeOrder(item: CustomerInterfaces['Order']): Observable<string> {

  //   return this.http.post("http://localhost:5161/api/Customers/Orders", item, { responseType: 'text' })
  // }

  RemoveFromCart(cartid:number):Observable<string>{
    return this.http.delete(`${this.CartUrl}/deletecart/${cartid}`, { responseType: 'text' })
  }


 // Define the headers
//  const headers = new HttpHeaders({
//   'Authorization': 'Bearer '+localStorage.getItem("token") // Replace YourAuthTokenHere with the actual token
//   // Add more headers as needed
// });
  getCustomerOrders(custid: number): Observable<any> {
    return this.http.get("http://localhost:5161/api/Customers/GetCustomerOrders/" + custid);
}
  GetOrdersDetails(custid: number): Observable<any> {
    return this.http.get("http://localhost:5161/api/Customers/GetCustomerOrdersDetails/"+custid)
  }

  getCustomerDetails(custid: number): Observable<any> {
    var url=this.CustomerUrl+"/"+custid;
  
    return this.http.get(url);
  }

  UpdateCustomer(item:CustomerInterfaces['CustomerDetails'],id:number):Observable<string>{
    var url=this.CustomerUrl+"/"+id;
     
    return this.http.put(url,item , {responseType:'text'})
  }

  UpdateWallet(item:CustomerInterfaces['CustomerDetails'],id:number):Observable<string>{
    var url=this.CustomerUrl+"/"+id+"/wallet";    
    return this.http.put(url,item , {responseType:'text'})
  }

  updateItemQuantity(cartid: number, newquantity: number): Observable<any> {
    console.log(cartid, newquantity);
    const url = `${this.CartUrl}/updatecartquantity/${cartid}/${newquantity}`;
    return this.http.put(url, null)
      .pipe(
        catchError(error => {
          console.error('Error updating quantity:', error.error);
          throw error;
        })
      );
  }
  
  logout(){
    this.shared.logout();
  }

  displayShipments(){
    this.ResultListDisplay = []
    this.http.get<any>("http://localhost:5161/api/Customers/GetShipments")
      .subscribe((data) => {
        this.ResultListDisplay.push(...data)
      });

    return this.ResultListDisplay
  }
}
