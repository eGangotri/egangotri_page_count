export class Stats {
    header:string = "";
    result:any[] = [];
    footer:string = "";

    reset(){
        this.header = "";
        this.result = [];
        this.footer = "";
    }
}