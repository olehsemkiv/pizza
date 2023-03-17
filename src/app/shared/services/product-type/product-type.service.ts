import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IProductTypeRequest } from '../../interfaces/product/productType.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  private productTypeCollection!: CollectionReference<DocumentData>;


  constructor(
    private afs: Firestore

  ) {
    this.productTypeCollection = collection(this.afs, 'producttype');
  }

  getAllFirebase() {
    return collectionData(this.productTypeCollection, { idField: 'id' });
  }

  getOneFirebase(id: string): Observable<DocumentData> {
    const productTypeDocumentreference = doc(this.afs, `producttype/${id}`);
    return docData(productTypeDocumentreference, { idField: 'id' });
  }

  createFirebase(productype: IProductTypeRequest) {
    return addDoc(this.productTypeCollection, productype);
  }

  updateFirebase(productype: IProductTypeRequest, id: string) {
    const productTypeDocumentreference = doc(this.afs, `producttype/${id}`);
    return updateDoc(productTypeDocumentreference, { ...productype })
  }

  deleteFirebase(id: number | string) {
    const productTypeDocumentreference = doc(this.afs, `producttype/${id}`);
    return deleteDoc(productTypeDocumentreference);
  }
}