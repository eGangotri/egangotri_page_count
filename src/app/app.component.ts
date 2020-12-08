import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Stats } from './stats';
import { HelperService } from './helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:  [ HelperService ]

})
export class AppComponent {
  title = 'eGangotri Page Counter';
  globalCount = 0;
  isWait = false;
  stats: Stats = new Stats();
  pdfCount = 0
  timeOfRequest = '';

  constructor(private datePipe: DatePipe, private service: HelperService)  {
  }

  resetToDefault() {
    this.service.resetToDefault(this);
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
