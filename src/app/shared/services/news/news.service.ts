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
import { newsElementRequest } from '../../interfaces/news/news.interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private newsCollection!: CollectionReference<DocumentData>;


  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) {
    this.newsCollection = collection(this.afs, 'news');
  }

  getAllFirebase() {
    return collectionData(this.newsCollection, { idField: 'id' });
  }

  getOneFirebase(id: string): Observable<DocumentData> {
    const newsDocumentreference = doc(this.afs, `news/${id}`);
    return docData(newsDocumentreference, { idField: 'id' });
  }

  createFirebase(news: newsElementRequest) {
    return addDoc(this.newsCollection, news);
  }

  updateFirebase(news: newsElementRequest, id: string) {
    const newsDocumentreference = doc(this.afs, `news/${id}`);
    return updateDoc(newsDocumentreference, { ...news })
  }

  deleteFirebase(id: number) {
    const newsDocumentreference = doc(this.afs, `news/${id}`);
    return deleteDoc(newsDocumentreference);
  }
}
