import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  resetToDefault(cpmnt:any) {
    cpmnt.globalCount = 0;
    cpmnt.stats.reset();
    cpmnt.pdfCount = 0;
    cpmnt.isWait = true;
    cpmnt.timeOfRequest = '';
  }
  constructor() { }

  async uploadFolder(event: any, cmpt:any) {
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
    });
  }
  clipboardResult(cmpnt:any) {
    cmpnt.stats.header = `Page Count for [${cmpnt.pdfCount}] pdfs on ` + cmpnt.datePipe.transform(new Date(), 'd MMM yyyy hh:mm aa' + "\n")
    let clipBoardData = cmpnt.stats.header;
    for (let i = 0; i <= cmpnt.stats.result.length; i++) {
      let res = cmpnt.stats.result[i];
      if (res) {
        clipBoardData += `${res?.counter} ${res?.name} ${res?.pageCount}\n`;
      }
    }
    clipBoardData += `Total: ${cmpnt.globalCount}`;
    return clipBoardData;
  }

  async countPages(file: File, counter: number = 0,cmpnt:any) {
    return file.arrayBuffer().then(async (buffer) => {
      const pdfDoc4 = await PDFDocument.load(buffer, { ignoreEncryption: true })
      const pageCount = pdfDoc4.getPageCount()
      const row = { counter: "(" + (counter + 1) + ").", name: file.name, pageCount: pageCount };
      cmpnt.stats.result.push(row);
      cmpnt.globalCount += pageCount;
      console.log(`Page Count # ${JSON.stringify(row)}`);
      return pageCount;
    }).catch((err) => {
      console.log("Err", err);
      return 0;
    });
  }
}
