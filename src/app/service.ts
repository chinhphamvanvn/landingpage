import { Product } from './models/products.class';


import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { User } from './models/user.class';

import { Company } from './models/company.class';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  public API_COMPANY : string ='https://api.icheck.com.vn/api/v1/pages?featured=1';
  public API_USER: string ='https://api.icheck.com.vn/api/v1/contacts';
  public API_PRODUCT: string = 'https://api.icheck.com.vn/api/v1/products?collection_id=15';
  constructor(
    public http: HttpClient
  ) { }

  getAllCompanys(): Observable<Company[]>{
    return this.http.get<Company[]>(this.API_COMPANY);
  }


  addUser(user): Observable<User>{
      return this.http.post<User>(this.API_USER, user);
  }
  
  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.API_PRODUCT);
  }

  handleError(err){
    if(err.error instanceof Error){
      console.log(`Client-side error : ${err.error.message}`);
    }
    else{
      console.log(`Server-side error : ${err.status} - ${err.error}`);
    }
  }
}
