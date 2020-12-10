import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { AppComponent } from './app.component';
import { sizeInfo } from './utils/Utils';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  resetToDefault(cpmnt:AppComponent) {
    cpmnt.globalCount = 0;
    cpmnt.stats.reset();
    cpmnt.pdfCount = 0;
    cpmnt.isWait = true;
    cpmnt.timeOfRequest = '';
    cpmnt.totalSize = 0;
    cpmnt.errorCount = 0;
  }
  constructor() { }

  async uploadFolder(event: any, cmpt:AppComponent) {
    cmpt.resetToDefault();
    const files = event.target.files;
    cmpt.pdfCount = files.length;
    let promiseArr = []
    for (let i = 0; i <= files.length; i++) {
      let file = files[i]
      if (file && file?.name.indexOf(".pdf") > 0) {
        promiseArr.push(await this.countPages(file, i,cmpt));
      }
    }

    await Promise.all(promiseArr).then((values) => {
      console.log(values);
      cmpt.isWait = false;
      console.log('isWait set to false');
      if(cmpt.errorCount > 0 ){
        cmpt.stats.errorMsgs = `${cmpt.errorCount} file(s) recorded errors and couldnt be added`;
      }
    });
  }
  
  clipboardResult(cmpnt:AppComponent) {
    let clipBoardData = cmpnt.stats.header + '\n';
    if(cmpnt.stats.errorMsgs){
      clipBoardData += cmpnt.stats.errorMsgs + '\n';
    } 
    for (let i = 0; i <= cmpnt.stats.result.length; i++) {
      let res = cmpnt.stats.result[i];
      if (res) {
        clipBoardData += `${res?.counter} ${res?.name} ${res?.pageCount} ${res?.pdfSize}\n\n`;
      }
    }
    clipBoardData += `Total Page Count: ${cmpnt.globalCount}`;
    clipBoardData += `\nTotal Size: ${sizeInfo(cmpnt.totalSize)}`;
    return clipBoardData;
  }

  async countPages(file: File, counter: number = 0,cmpnt:AppComponent) {
    return file.arrayBuffer().then(async (buffer) => {
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true })
      const pageCount = pdfDoc.getPageCount()
      const pdfSize = sizeInfo(file.size);
      const row = { counter: "(" + (counter + 1) + ").", name: file.name, pageCount , pdfSize};
      cmpnt.stats.result.push(row);
      cmpnt.globalCount += pageCount;
      cmpnt.totalSize += file.size;
      cmpnt.stats.header = `${cmpnt.name}-Work Page Count for ${cmpnt.pdfCount} pdfs on ` + cmpnt.datePipe.transform(new Date(), 'd MMM yyyy hh:mm aa' + "\n")
      console.log(`Page Count # ${JSON.stringify(row)}`);
      return pageCount;
    }).catch((err) => {
      console.log("Err", err);
      cmpnt.errorCount++;
      const row = { counter: "(" + (counter + 1) + ").", name: "****"+file.name, pageCount: 'ERROR-READING', pdfSize:sizeInfo(file.size), "error":true};
      cmpnt.stats.result.push(row);
      cmpnt.totalSize += file.size;
      cmpnt.stats.header = `${cmpnt.name}-Work Page Count for ${cmpnt.pdfCount} pdfs on ` + cmpnt.datePipe.transform(new Date(), 'd MMM yyyy hh:mm aa' + "\n")
      console.log(`Page Count # ${JSON.stringify(row)}`);
      return 0;
    });
  }
}
