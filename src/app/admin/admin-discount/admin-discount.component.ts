import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { discountElementResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { Storage } from '@angular/fire/storage';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { ToastrService } from 'ngx-toastr';





@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {

  public discountForm!: FormGroup;
  public isUploaded = false;
  public editStatus = false;
  public editID!: number | string;
  public uploadPercent!: number;


  public discountAdmin: Array<discountElementResponse> = [];


  constructor(
    private fb: FormBuilder,
    private storage: Storage,
    private imageService: ImageService,
    private discountService: DiscountService,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.getData();
  }


  initCategoryForm(): void {
    this.discountForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    })
  }


  getData(): void {
    this.discountService.getAllFirebase().subscribe(data => {
      this.discountAdmin = data as discountElementResponse[];
    })
  }

  addItem(): void {
    if (this.editStatus) {
      this.discountService.updateFirebase(this.discountForm.value, this.editID as string).then(() => {
        this.getData();
        this.toastr.success('Discount Update');
      })
    } else {
      this.discountService.createFirebase(this.discountForm.value).then((data) => {
        this.getData();
        this.toastr.success('Discount Add');
      })
    }
    this.discountForm.reset();
    this.editStatus = false;
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  deleteItem(discount: discountElementResponse): void {
    if (confirm("rly delete ?")) {
      this.discountService.deleteFirebase(discount.id).then(() => {
        this.getData();
        this.toastr.success('Discount Delete');
      })
    }
  }

  editItem(discount: discountElementResponse): void {
    this.discountForm.patchValue({
      title: discount.title,
      description: discount.description,
      imagePath: discount.imagePath,
    })
    this.editStatus = true;
    this.editID = discount.id;
    this.isUploaded = true;
  }





  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadfile('images', file.name, file)
      .then(data => {
        this.discountForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);

      })

  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.discountForm.patchValue({ imagePath: null })
      })
      .catch(err => {
        console.error(err);
      })
  }

  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;
  }

}
