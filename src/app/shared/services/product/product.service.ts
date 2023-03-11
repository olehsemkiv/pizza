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
import { IProductRequest } from '../../interfaces/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productCollection!: CollectionReference<DocumentData>;


  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) {
    this.productCollection = collection(this.afs, 'product');
  }

  getAllFirebase() {
    return collectionData(this.productCollection, { idField: 'id' });
  }

  getOneFirebase(id: string): Observable<DocumentData> {
    const productDocumentreference = doc(this.afs, `product/${id}`);
    return docData(productDocumentreference, { idField: 'id' });
  }

  createFirebase(product: IProductRequest) {
    return addDoc(this.productCollection, product);
  }

  updateFirebase(product: IProductRequest, id: string) {
    const productDocumentreference = doc(this.afs, `product/${id}`);
    return updateDoc(productDocumentreference, { ...product })
  }

  deleteFirebase(id: number) {
    const productDocumentreference = doc(this.afs, `product/${id}`);
    return deleteDoc(productDocumentreference);
  }
}
