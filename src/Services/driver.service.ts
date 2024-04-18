import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedModule } from '../app/shared/shared.module';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
DriverUrl="http://localhost:5161/api/Drivers";
  AssignedDriversUrl="http://localhost:5161/api/Drivers/AssignedOrders"
  ordersUrl="http://localhost:5161/api/Drivers/GetAllDriverOrders";
  validate=new SharedModule()
  constructor(private http: HttpClient) { }

  getDetailsOfDriver(driverid:number):Observable<any>{
    var array:any=[];
    this.http.get(this.DriverUrl+"/"+driverid).subscribe(data=>{
      array.push(data);
    })
    console.log(array);
    return array;
  }
  getDriverOrders(id: number): Observable<any> {
    var url=this.AssignedDriversUrl+"/"+id;
    return this.http.get(url)
  }

  GettingDriverOrders(driverid:number ):Observable<any>{
    this.ordersUrl=this.ordersUrl+"/"+driverid;
    return this.http.get(this.ordersUrl)
  }

  showOrderdetails(id:number):Observable<any>{
    var url="http://localhost:5161/api/Drivers/OrderdetailsView/"+id;
    return this.http.get(url)
  }

  GetPendingOrders(){
    return this.http.get("http://localhost:5161/api/ViewsDisplay/OrderdetailsView")
  }

  UpdateStatus(item: any, msg: string): Observable<any> {
    const url = `http://localhost:5161/api/Drivers/UpdateStatus?status=${msg}`;
    return this.http.post(url, item ,{responseType:'text'});
}
logout(){
  this.validate.logout();
}

}
