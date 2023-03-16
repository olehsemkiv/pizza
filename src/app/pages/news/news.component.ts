import { Component, OnInit } from '@angular/core';
import { newsElementResponse } from 'src/app/shared/interfaces/news/news.interfaces';
import { NewsService } from 'src/app/shared/services/news/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public userNews: Array<newsElementResponse> = [];

  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.loadNews();
    window.scrollTo(0, 0);
  }

  loadNews(): void {
    this.newsService.getAllFirebase().subscribe(data => {
      this.userNews = data as newsElementResponse[];
    })
  }

}
