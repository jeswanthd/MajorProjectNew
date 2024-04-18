import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInterface } from '../Models/login-interface';
import { Observable, catchError, of, throwError } from 'rxjs';
import axios from 'axios';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public MainUrl;
  constructor(private http: HttpClient,private router: Router) {
    this.MainUrl = "http://localhost:5161/api/Login";
  }
  public login(credentials: LoginInterface['credentials']): Observable<boolean> {
    const adminurl = `${this.MainUrl}/Admin`;
    const managerurl = `${this.MainUrl}/Manager`;
    const customerurl = `${this.MainUrl}/Customer`;
    const driverurl = `${this.MainUrl}/Driver`;
  
    return new Observable<boolean>(observer => {
      try {
                    
        if (credentials.SelectedRole === 'Admin') {
          const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem("tokenadmin")
            // Add more headers as needed
          });
        
          this.http.post<{ token: string, adminId: number }>(adminurl, credentials, { headers: headers }).pipe(
            catchError(error => {
              Swal.fire({
                icon: 'error',
                title: 'Invalid',
                text: 'Login failed',
              });
              console.error('Error occurred:', error);
              return throwError('Login failed');
            })
          ).subscribe(data => {
            console.log(data);
            const resadmin = data.adminId;
            console.log(resadmin);
            localStorage.setItem("tokenadmin", data.token);
            if (resadmin !== null && resadmin !== 0) {
              this.router.navigate(['/admin', { adminid: resadmin }]);
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Logged in successfully as Admin.',
                showConfirmButton: true
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
              observer.next(true);
              observer.complete();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Login failed',
                text: 'Invalid credentials',
              });
              console.log('Login failed');
              observer.next(false);
              observer.complete();
            }
          });
        }
        if (credentials.SelectedRole === 'Customer') {
          const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem("tokencustomer")
            // Add more headers as needed
          });
      
          this.http.post<{ token: string, userId: number }>(customerurl, credentials, { headers: headers }).pipe(
            catchError(error => {
              Swal.fire({
                icon: 'error',
                title: 'Invalid',
                text: 'Login failed',
              });
              console.error('Error occurred:', error);
              return throwError('Login failed');
            })
          ).subscribe(data => {
            console.log(data.token); // Accessing the token
            console.log(data.userId); // Accessing the user ID
            console.log(data); // Whole response object
            const rescustomer = data.userId;
            localStorage.setItem("tokencustomer", data.token);
            if (rescustomer !== null && rescustomer !== 0) {
              this.router.navigate(['/customer', { customerid: rescustomer }]);
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Logged in successfully as customer.',
                showConfirmButton: true
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
              observer.next(true);
              observer.complete();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Login failed',
                text: 'Invalid credentials',
              });
              console.log('Login failed');
              observer.next(false);
              observer.complete();
            }
          });
        }
      
        if (credentials.SelectedRole === 'Manager') {
          const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem("tokenmanager")
            // Add more headers as needed
          });
      
          this.http.post<{ token: string, managerId: number }>(managerurl, credentials, { headers: headers }).pipe(
            catchError(error => {
              Swal.fire({
                icon: 'error',
                title: 'Invalid',
                text: 'Login failed',
              });
              console.error('Error occurred:', error);
              return throwError('Login failed');
            })
          ).subscribe(data => {
            const resmanager = data.managerId;
            localStorage.setItem("tokenmanager", data.token);
            console.log(data);
            if (resmanager !== null && resmanager !== 0) {
              this.router.navigate(['/manager', { managerid: resmanager }]);
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Logged in successfully as manager.',
                showConfirmButton: true
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
              observer.next(true);
              observer.complete();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Login failed',
                text: 'Invalid credentials',
              });
              console.log('Login failed');
              observer.next(false);
              observer.complete();
            }
          });
        }
      
        if (credentials.SelectedRole === 'Driver') {
          const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem("tokendriver")
            // Add more headers as needed
          });
      
          this.http.post<{ token: string, driverId: number }>(driverurl, credentials, { headers: headers }).pipe(
            catchError(error => {
              Swal.fire({
                icon: 'error',
                title: 'Invalid',
                text: 'Login failed',
              });
              console.error('Error occurred:', error);
              return throwError('Login failed');
            })
          ).subscribe(data => {
            const resdriver = data.driverId;
            localStorage.setItem("tokendriver", data.token);
            console.log(data);
            if (resdriver !== null && resdriver !== 0) {
              this.router.navigate(['/driver', { driverid: resdriver }]);
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Logged in successfully as driver.',
                showConfirmButton: true
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
              observer.next(true);
              observer.complete();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Login failed',
                text: 'Invalid credentials',
              });
              console.log('Login failed');
              observer.next(false);
              observer.complete();
            }
          });
        }
        
      } catch (error) {
        console.error("Error logging in:", error);
        observer.error(error);
      }
    });
  }
}

  
 

  


   


  
 


