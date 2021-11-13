import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { iCaracteristicas, iSGBD } from "../models/iSGBD";


@Injectable({
    providedIn: 'root'
})

export class SGBDController {
    
    link = environment.url;

    constructor(
        private http: HttpClient,
    ) {
    }

    GetNearestNeighbors(model: iCaracteristicas): Promise<any> {
        return this.http.post(this.link + 'sgbd/knn', model).toPromise();
    }
}
