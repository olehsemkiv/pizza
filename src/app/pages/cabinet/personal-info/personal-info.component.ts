import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';



@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  public personalInfoForm!: FormGroup;



  // ====================================================================================================================================================

  public currentUser!: any;

  constructor(
    private fb: FormBuilder,
    private orderService: OrdersService,
    private toastr: ToastrService
  
  ) { }

  ngOnInit(): void {
    
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
   
    this.getInfoUser();
    




  }

  initPersonalForm(): void {
    this.personalInfoForm = this.fb.group({
      firstName: [this.currentUser.firstName, Validators.required],
      lastName: [this.currentUser.lastName, Validators.required],
      bday: [null],
      email: [this.currentUser.email, Validators.required],
      phoneNumber: [this.currentUser.phoneNumber, Validators.required],
      street: [this.currentUser.street,],
      house: [this.currentUser.house,],
      entrance: [this.currentUser.entrance,],
    })
  }



  getInfoUser(): void {
    if (localStorage.length > 0 && localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    }


    this.initPersonalForm();

  }

  changeData(): void {
    // console.log(this.personalInfoForm.value);


    this.currentUser.firstName = this.personalInfoForm.value.firstName;
    this.currentUser.lastName = this.personalInfoForm.value.lastName;
    this.currentUser.email = this.personalInfoForm.value.email;
    this.currentUser.phoneNumber = this.personalInfoForm.value.phoneNumber;
    this.currentUser.street = this.personalInfoForm.value.street;
    this.currentUser.house = this.personalInfoForm.value.house;
    this.currentUser.entrance = this.personalInfoForm.value.entrance;
    console.log(this.currentUser);

    localStorage.setItem('currentUser', JSON.stringify(this.currentUser))

    this.orderService.updateFirebaseUserOrders(this.personalInfoForm.value, this.currentUser.uid).then(() => {
     this.toastr.success('Дані оновлено')
    })

  }



}
