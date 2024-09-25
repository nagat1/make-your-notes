import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Itoken } from '../interfaces/itoken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private _HttpClient=inject(HttpClient)
userdata:Itoken= {} as Itoken;
  constructor() { }
  savedata(){
    if(localStorage.getItem('usertoken')!==null){
     this.userdata= jwtDecode(localStorage.getItem('usertoken')!)
     console.log(this.userdata.id)
    }
  }
  signup(data:object):Observable<any>{
return this._HttpClient.post(`${environment.baseurl}api/v1/users/signUp`,data)
  }
  signin(data:object):Observable<any>{
return this._HttpClient.post(`${environment.baseurl}api/v1/users/signIn`,data)
  }
}
