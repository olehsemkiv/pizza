import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/services/account/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  unLogin(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
    this.accountService.isUserLogin$.next(true);
  }

}
