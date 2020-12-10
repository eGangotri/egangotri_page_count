export class Stats {
    header:string = "";
    errorMsgs:string = "";
    result:any[] = [];
    footer:string = "";

    reset(){
        this.header = "";
        this.result = [];
        this.footer = "";
    }
}