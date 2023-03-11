import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { discountElementRequest, discountElementResponse } from 'src/app/shared/interfaces/discount/discount.interface';
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


@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private discountCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) {
    this.discountCollection = collection(this.afs, 'discount');
  }


  getAllFirebase() {
    return collectionData(this.discountCollection, { idField: 'id' });
  }

  getOneFirebase(id: string): Observable<DocumentData> {
    const discountDocumentreference = doc(this.afs, `discount/${id}`);
    return docData(discountDocumentreference, { idField: 'id' });
  }

  createFirebase(discount: discountElementRequest) {
    return addDoc(this.discountCollection, discount);
  }

  updateFirebase(discount: discountElementRequest, id: string) {
    const discountDocumentreference = doc(this.afs, `discount/${id}`);
    return updateDoc(discountDocumentreference, { ...discount })
  }

  deleteFirebase(id: number) {
    const discountDocumentreference = doc(this.afs, `discount/${id}`);
    return deleteDoc(discountDocumentreference);
  }
}
