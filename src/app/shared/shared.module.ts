import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
  validateUsername(username: string): boolean {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(username);
  }
  validatePassword(password: string): boolean {
    const regex = /[^a-zA-Z0-9]/;
    return regex.test(password);
  }
  validateMobileNumber(mobileNumber: string): boolean {
    const regex = /^[0-9]{10}$/;
    return regex.test(mobileNumber);
  }
  validatePasswordLength(password: string): boolean {
    if (password.length < 6) {
      return false;
    }
    else {
      return true;
    }
  }

  onQuantityInput(inputNumber: number): boolean {
    if (inputNumber <= 0) {
      return false;
    }
    else {
      return true;
    }
  }

  validateLicensePlate(plateNumber: string): boolean {
    const pattern = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;
    return pattern.test(plateNumber);
  }

  logout() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success", // Added 'mr-2' class for margin-right
        cancelButton: "btn btn-danger " // No change for cancel button
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Logged Out!",
          text: "You have been logged out successfully.",
          icon: "success"
        }).then(() => {
          // Redirect to logout page or perform additional actions after logout
          window.location.href = "/login";
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "You are still logged in.",
          icon: "error"
        });
      }
    });
  }
  
  
}
