import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Stats } from './stats';
import { HelperService } from './helper.service';
import { sizeInfo } from './utils/Utils';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:  [ HelperService ]

})
export class AppComponent implements OnInit {
  title = 'eGangotri Page Counter';
  globalCount = 0;
  totalSize = 0;
  isWait = false;
  stats: Stats = new Stats();
  pdfCount = 0
  timeOfRequest = '';
  name = ''

  constructor(public datePipe: DatePipe, private service: HelperService, private cookieService:CookieService)  {
  }

  ngOnInit(): void {
    const userName = this.cookieService.get('user-name')
    if(userName && userName.length > 0){
      this.name = userName;
    }

  }

  onBlur(value: string) { 
    this.name = value; 
    this.cookieService.set('user-name', this.name );
  }

  resetToDefault() {
    this.service.resetToDefault(this);
  }

  getTotalSize(){
    return sizeInfo(this.totalSize);
  }

  async uploadFolder(event: any) {
    return this.service.uploadFolder(event,this);
  }

  clipboardResult(){
    return this.service.clipboardResult(this);
  }

  confirmationAlert() {
    alert(this.isWait === true ? 'Still calculating. Pls Wait' : 'Results Copied');
  }
}
