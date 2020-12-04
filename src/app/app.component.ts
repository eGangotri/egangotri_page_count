import { Component } from '@angular/core';
import {ClipboardModule} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eGangotri-page-counter';
  globalCount = 0;
  result: any[] = [];

  clipboardResult(){
    let clipBoardData = ""
    for (let i = 0; i <= this.result.length; i++) {
      let res = this.result[i]
      if(res){
        clipBoardData += `${res?.name} ${res?.pageCount}\n`
      }
    }
    clipBoardData += `Total: ${this.globalCount}`;
    return clipBoardData;
  }

  async uploadFolder(event: any) {
    this.globalCount = 0
    this.result = []
    const files = event.target.files;
    for (let i = 0; i <= files.length; i++) {
      let file = files[i]
      if (file && file?.name.indexOf(".pdf") > 0) {
        this.countPages(file, i + 1).then((_count) => {
        })
      }
    }
  }

  countPages(fileInfo: File, counter: number) {

    let count = 0
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      try {
        reader.readAsBinaryString(fileInfo);
        reader.onloadend = () => {
          const res: string | undefined = reader.result?.toString();
          count = res?.match(/\/Type[\s]*\/Page[^s]/g)?.length || 0;
          this.result.push({ counter, name: fileInfo.name, pageCount: count });
          this.globalCount += count;
          resolve(count);
        }

        // Make sure to handle error states
        reader.onerror = function (e: any) {
          console.log("reader.onerror: ", e);
          reject(e);
        };
      }
      catch (err) {
        console.log("err: ", err);
      }
    });
  }
}
