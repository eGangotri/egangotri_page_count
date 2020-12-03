import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eGangotri-page-counter';
  globalCount = 0;
  result: any[] = [];

  async uploadFolder(event: any) {
    this.globalCount = 0
    this.result = []
    const files = event.target.files;
    console.log("event.target: ", files);
    for (let i = 0; i <= files.length; i++) {
      let file = files[i]
      if (file && file?.name.indexOf(".pdf") > 0) {
        this.countPages(file, i + 1).then((_count) => {
          console.log(`_count: ${_count}`);
        })
      }
    }
    console.log(this.result)
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
          reject(e);
        };
      }
      catch (err) {
        console.log("err: ", err);
      }
    });
  }
}
