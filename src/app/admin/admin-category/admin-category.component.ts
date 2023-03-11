import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICategoryElementResponse } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public categoriesForm!: FormGroup;
  public isUploaded = false;
  public editStatus = false;
  public editID!: number | string;
  public uploadPercent!: number;

  public categoryAdmin: Array<ICategoryElementResponse> = [];


  constructor(
    private fb: FormBuilder,
    private imageService: ImageService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.getData();
  }

  initCategoryForm(): void {
    this.categoriesForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required]
    })
  }

  getData(): void {
    this.categoryService.getAllFirebase().subscribe(data => {
      this.categoryAdmin = data as ICategoryElementResponse[];
    })
  }

  addItem(): void {
    if (this.editStatus) {
      this.categoryService.updateFirebase(this.categoriesForm.value, this.editID as string).then(() => {
        this.getData();
        this.toastr.success('Discount Update');
      })
    } else {
      this.categoryService.createFirebase(this.categoriesForm.value).then((data) => {
        this.getData();
        this.toastr.success('Discount Add');
      })
    }
    this.categoriesForm.reset();
    this.editStatus = false;
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  deleteItem(category: ICategoryElementResponse): void {
    if (confirm("rly delete ?")) {
      this.categoryService.deleteFirebase(category.id).then(() => {
        this.getData();
        this.toastr.success('Discount Delete');
      })
    }
  }

  editItem(category: ICategoryElementResponse): void {
    this.categoriesForm.patchValue({
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
        this.categoriesForm.patchValue({
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
        this.categoriesForm.patchValue({ imagePath: null })
      })
      .catch(err => {
        console.error(err);
      })
  }

  valueByControl(control: string): string {
    return this.categoriesForm.get(control)?.value;
  }

}
