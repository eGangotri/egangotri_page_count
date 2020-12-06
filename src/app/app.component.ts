import { Component } from '@angular/core';
import { PDFDocument } from 'pdf-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eGangotri-page-counter';
  globalCount = 0;
  result: any[] = [];
  isWait = false;

  resetToDefault() {
    this.globalCount = 0
    this.result = []
  }

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

  confirmationAlert(){
    alert('Results Copied')
  }

  async uploadFolder(event: any) {
    this.resetToDefault();
    this.isWait = true;
    console.log('isWait set to true');
    const files = event.target.files;
    let promiseArr = []
    for (let i = 0; i <= files.length; i++) {
      let file = files[i]
      if (file && file?.name.indexOf(".pdf") > 0) {
        promiseArr.push(await this.countPages(file,i));
      }
    }
    
    await Promise.all(promiseArr).then((values) => {
      console.log(values);
      this.isWait = false;
      console.log('isWait set to false');
    });
  }

  async countPages(file:File, counter:number = 0){
    return file.arrayBuffer().then(async (buffer) =>  {
      const pdfDoc4 = await PDFDocument.load(buffer,{ ignoreEncryption: true })
      const pageCount = pdfDoc4.getPageCount()
      this.result.push({ name: file.name, pageCount: pageCount });
      this.globalCount += pageCount;
       console.log(`Page Count # ${counter+1} ${file.name}: ${pageCount}`);
       return pageCount;
    }).catch((err) =>{
      console.log("Err", err);
      return 0;
    });
  }

}
