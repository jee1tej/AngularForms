import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Employee } from "../models/employee.model";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class LanguagesGet{
        
    constructor(private http: Http){
        
    }

     GetLanguages() : Observable<any>{
         
        let headers = new Headers({ 'content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.get("http://localhost:3100/postemployee",options)
                        .delay(5000)
                        .map(this.extractData)
                        .catch(this.handleError);        
    }

    private handleError(error: any): any {
        console.error("post error: ", error);
        return Observable.throw(error.statusText);
    }

    private extractData(res: Response): any {
        let body = res.json();
        return body.data || {};
    }
}