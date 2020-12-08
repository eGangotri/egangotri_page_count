import { Component } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { DatePipe } from '@angular/common';
import { Stats } from './stats';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eGangotri Page Counter';
  globalCount = 0;
  isWait = false;
  stats: Stats = new Stats();
  pdfCount = 0

  constructor(private datePipe: DatePipe) {
  }

  resetToDefault() {
    this.globalCount = 0;
    this.stats.reset();
    this.pdfCount = 0;
    this.isWait = true;
  }

  clipboardResult() {
    this.stats.header = `Page Count for [${this.pdfCount}] pdfs on ` + this.datePipe.transform(new Date(), 'd MMM yyyy hh:mm aa' + "\n")
    let clipBoardData = this.stats.header;
    for (let i = 0; i <= this.stats.result.length; i++) {
      let res = this.stats.result[i];
      if (res) {
        clipBoardData += `${res?.counter} ${res?.name} ${res?.pageCount}\n`;
      }
    }
    clipBoardData += `Total: ${this.globalCount}`;
    return clipBoardData;
  }

  confirmationAlert() {
    let msg = this.isWait === true ? 'Still calculating. Pls Wait' : 'Results Copied';
    alert(msg);
  }

  async uploadFolder(event: any) {
    this.resetToDefault();
    const files = event.target.files;
    this.pdfCount = files.length;
    let promiseArr = []
    for (let i = 0; i <= files.length; i++) {
      let file = files[i]
      if (file && file?.name.indexOf(".pdf") > 0) {
        promiseArr.push(await this.countPages(file, i));
      }
    }

    await Promise.all(promiseArr).then((values) => {
      console.log(values);
      this.isWait = false;
      console.log('isWait set to false');
    });
  }

  async countPages(file: File, counter: number = 0) {
    return file.arrayBuffer().then(async (buffer) => {
      const pdfDoc4 = await PDFDocument.load(buffer, { ignoreEncryption: true })
      const pageCount = pdfDoc4.getPageCount()
      const row = { counter: "(" + (counter + 1) + ").", name: file.name, pageCount: pageCount };
      this.stats.result.push(row);
      this.globalCount += pageCount;
      console.log(`Page Count # ${JSON.stringify(row)}`);
      return pageCount;
    }).catch((err) => {
      console.log("Err", err);
      return 0;
    });
  }

}
