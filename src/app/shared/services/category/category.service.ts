import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc
} from '@angular/fire/firestore';
import { DocumentData, collection, addDoc } from '@firebase/firestore';
import { ICategoryElementRequest } from '../../interfaces/category/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryCollection!: CollectionReference<DocumentData>;


  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) {
    this.categoryCollection = collection(this.afs, 'categories');
  }

  getAllFirebase() {
    return collectionData(this.categoryCollection, { idField: 'id' });
  }

  getOneFirebase(id: string): Observable<DocumentData> {
    const categoryDocumentreference = doc(this.afs, `categories/${id}`);
    return docData(categoryDocumentreference, { idField: 'id' });
  }

  createFirebase(category: ICategoryElementRequest) {
    return addDoc(this.categoryCollection, category);
  }

  updateFirebase(category: ICategoryElementRequest, id: string) {
    const categoryDocumentreference = doc(this.afs, `categories/${id}`);
    return updateDoc(categoryDocumentreference, { ...category })
  }

  deleteFirebase(id: number | string) {
    const categoryDocumentreference = doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocumentreference);
  }
}
