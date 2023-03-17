import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IProductTypeResponse } from 'src/app/shared/interfaces/product/productType.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ProductTypeService } from 'src/app/shared/services/product-type/product-type.service';

@Component({
  selector: 'app-admin-product-type',
  templateUrl: './admin-product-type.component.html',
  styleUrls: ['./admin-product-type.component.scss']
})
export class AdminProductTypeComponent implements OnInit {

  public productTypeForm!: FormGroup;
  public isUploaded = false;
  public editStatus = false;
  public editID!: number | string;
  public uploadPercent!: number;

  public productTypeAdmin: Array<IProductTypeResponse> = [];

  constructor(
    private fb: FormBuilder,
    private imageService: ImageService,
    private pTypeService: ProductTypeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initPTypeForm();
    this.getData();

  }

  initPTypeForm(): void {
    this.productTypeForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required]
    })
  }

  getData(): void {
    this.pTypeService.getAllFirebase().subscribe(data => {
      this.productTypeAdmin = data as IProductTypeResponse[];
    })
  }

  addItem(): void {
    if (this.editStatus) {
      this.pTypeService.updateFirebase(this.productTypeForm.value, this.editID as string).then(() => {
        this.getData();
        this.toastr.success('Product Type Update');
      })
    } else {
      this.pTypeService.createFirebase(this.productTypeForm.value).then((data) => {
        this.getData();
        this.toastr.success('Product Type Add');
      })
    }
    this.productTypeForm.reset();
    this.editStatus = false;
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  deleteItem(category: IProductTypeResponse): void {
    if (confirm("rly delete ?")) {
      this.pTypeService.deleteFirebase(category.id).then(() => {
        this.getData();
        this.toastr.success('Product Type Delete');
      })
    }
  }

  editItem(category: IProductTypeResponse): void {
    this.productTypeForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath,
    })
    this.editStatus = true;
    this.editID = category.id;
    this.isUploaded = true;
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadfile('images', file.name, file)
      .then(data => {
        this.productTypeForm.patchValue({
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
        this.productTypeForm.patchValue({ imagePath: null })
      })
      .catch(err => {
        console.error(err);
      })
  }

  valueByControl(control: string): string {
    return this.productTypeForm.get(control)?.value;
  }

}
