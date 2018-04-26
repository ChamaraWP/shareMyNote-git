import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

/*
  Generated class for the PostsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const API:string = "http://orangevalleycaa.org/api/music";
@Injectable()
export class PostsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PostsProvider Provider');
  }

  getPosts(){
    return this.http.get<any>(API)
      .map(response => response);
  }

}
