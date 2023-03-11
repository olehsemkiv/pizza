import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { newsElementResponse } from 'src/app/shared/interfaces/news/news.interfaces';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { NewsService } from 'src/app/shared/services/news/news.service';
import { Storage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent implements OnInit {

  public newsForm!: FormGroup;
  public editStatus = false;
  public editID!: number | string;
  public uploadPercent!: number;
  public isUploaded = false;

  public newsAdmin: Array<newsElementResponse> = [];

  constructor(
    private fb: FormBuilder,
    private newsService: NewsService,
    private imageService: ImageService,
    private storage: Storage,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.getData();
    this.initCategoryForm();
  }

  initCategoryForm(): void {
    this.newsForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    })
  }

  getData(): void {
    this.newsService.getAllFirebase().subscribe(data => {
      this.newsAdmin = data as newsElementResponse[];
    })
  }

  addItem(): void {
    if (this.editStatus) {
      this.newsService.updateFirebase(this.newsForm.value, this.editID as string).then(() => {
        this.getData();
        this.toastr.success('Discount Update');
      })
    } else {
      this.newsService.createFirebase(this.newsForm.value).then((data) => {
        this.getData();
        this.toastr.success('Discount Add');
      })
    }
    this.newsForm.reset();
    this.editStatus = false;
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  deleteItem(discount: newsElementResponse): void {
    if (confirm("rly delete ?")) {
      this.newsService.deleteFirebase(discount.id).then(() => {
        this.getData();
        this.toastr.success('Discount Delete');
      })
    }
  }

  editItem(discount: newsElementResponse): void {
    this.newsForm.patchValue({
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
        this.newsForm.patchValue({
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
        this.newsForm.patchValue({ imagePath: null })
      })
      .catch(err => {
        console.error(err);
      })
  }

  valueByControl(control: string): string {
    return this.newsForm.get(control)?.value;
  }

}
