import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICategoryElementResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { IProductTypeResponse } from 'src/app/shared/interfaces/product/productType.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ProductTypeService } from 'src/app/shared/services/product-type/product-type.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  public productsAdmin: Array<IProductResponse> = [];
  public categoriesAdmin: Array<ICategoryElementResponse> = [];
  public productTypeAdmin: Array<IProductTypeResponse> = [];
  public editStatus = false;
  public editID!: number | string;
  public uploadPercent!: number;
  public isUploaded = false;
  public productForm!: FormGroup;
  public openStatus = false;

  constructor(
    private categoriesService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
    private imageService: ImageService,
    private toastr: ToastrService,
    private pTypeService: ProductTypeService
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.loadDataCategories();
    this.loadDataProducts();
    this.loadProductType();



  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      type: [null],
      name: [null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1]
    })
  }

  loadDataProducts(): void {
    this.productService.getAllFirebase().subscribe(data => {
      this.productsAdmin = data as IProductResponse[];
    })
  }

  loadDataCategories(): void {
    this.categoriesService.getAllFirebase().subscribe(data => {
      this.categoriesAdmin = data as ICategoryElementResponse[];
    })
  }

  loadProductType(): void {
    this.pTypeService.getAllFirebase().subscribe(data => {
      this.productTypeAdmin = data as IProductTypeResponse[];
    })
  }

  addProduct(): void {
    if (this.editStatus) {
      this.productService.updateFirebase(this.productForm.value, this.editID as string).then((data) => {
        this.loadDataProducts();
        this.toastr.success('Product Update');
      })
    }
    else {
      this.productService.createFirebase(this.productForm.value).then((data) => {
        this.loadDataProducts();
        this.toastr.success('Producnt Add');
      })
    }
    this.productForm.reset();
    this.productForm.patchValue({
      count: 1
    })
    this.editStatus = false;
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.openStatus = false;
  }
  editProduct(product: IProductResponse): void {
    window.scrollTo(0,0)
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      description: product.description,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath,

    })
    this.editStatus = true;
    this.editID = product.id;
    this.isUploaded = true;
    this.openStatus = true;

  }

  deleteProduct(product: IProductResponse): void {
    if (confirm('Rly delete ?')) {
      this.productService.deleteFirebase(product.id).then(() => {
        this.loadDataProducts();
        this.toastr.success('Product Delete');
      })
    }
  }
  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadfile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
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
        this.productForm.patchValue({ imagePath: null })
      })
      .catch(err => {
        console.error(err);
      })
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }

  isOpen(): void {
    this.openStatus = !this.openStatus;
    this.editStatus = false;
  }

  // ====================================================================================================================================================
  // ====================================================================================================================================================
  // ====================================================================================================================================================

  changeType(): void {

  }

}
