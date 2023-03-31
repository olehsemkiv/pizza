import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public contactsForm!: FormGroup;
  public tgURL = environment.TELEGRAM_KEY.url;
  public chatID = environment.TELEGRAM_KEY.chatID;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.initContactsForm();
  }

  initContactsForm(): void {
    this.contactsForm = this.fb.group({
      name: [null, Validators.required],
      phone: [null, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      email: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      message: [null, Validators.required]
    })
  }

  submitContacts(): void {
    console.log(this.contactsForm.value);

    const text = `
    ===
    Ім'я: ${this.contactsForm.value.name};
    ===
    Телефон: ${this.contactsForm.value.phone};
    ===
    Email:: ${this.contactsForm.value.email};
    ===
    Повідомлення: ${this.contactsForm.value.message};
    ===
    `;



    const params = { chat_id: this.chatID, text };

    this.http.post(this.tgURL, params).subscribe(
      () => {
        this.contactsForm.reset();
        this.toastr.success('Ваше повідомлення відправлено, очікуйте фідбек!')
      },
      (error) => {
        console.error(error);
      }
    );
  }
}


