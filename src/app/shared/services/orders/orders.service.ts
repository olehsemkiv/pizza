import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { IOrderRequest } from '../../interfaces/oreders/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private ordersCollection!: CollectionReference<DocumentData>;


  public changeBasket = new Subject<boolean>();

  constructor(
    private afs: Firestore
  ) {
    this.ordersCollection = collection(this.afs, 'orders');

  }

  getAllFirebase() {
    return collectionData(this.ordersCollection, { idField: 'id' });
  }

  getOneFirebase(id: string): Observable<DocumentData> {
    const orderDocumentreference = doc(this.afs, `orders/${id}`);
    return docData(orderDocumentreference, { idField: 'id' });
  }

  createFirebase(order: IOrderRequest) {
    return addDoc(this.ordersCollection, order);
  }

  updateFirebase(order: IOrderRequest, id: string) {
    const orderDocumentreference = doc(this.afs, `orders/${id}`);
    return updateDoc(orderDocumentreference, { ...order })
  }

  deleteFirebase(id: number | string) {
    const orderDocumentreference = doc(this.afs, `orders/${id}`);
    return deleteDoc(orderDocumentreference);
  }

  updateFirebaseUserOrders(order: any, id: string) {
    const orderUserDocumentreference = doc(this.afs, `users/${id}`);
    return updateDoc(orderUserDocumentreference, { ...order })
  }

  getOneUser(id: string): Observable<DocumentData> {
    const orderDocumentreference = doc(this.afs, `users/${id}`);
    return docData(orderDocumentreference, { idField: 'id' });
  }
}
